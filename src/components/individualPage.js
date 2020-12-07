import React from 'react';
import {Card, Avatar, Row, Col, Tabs, Slider, Button, Form, Input, List, Progress, Popover, Modal} from 'antd';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import lv0 from '../level_tree/lv0.png';
import lv1 from '../level_tree/lv1.png';
import lv2 from '../level_tree/lv2.png';
import lv3 from '../level_tree/lv3.png';
import {getLevel} from '../actions/authentication';
import {MyFeed} from '../components';
import { db } from "../firebase";
import PropTypes from "prop-types";
import {backend_makeToDo, backend_getToDo} from '../backend';
import {QuestionCircleOutlined} from '@ant-design/icons';

const {TabPane}=Tabs;


const Editor = ({ onChange, value, submitting, onSubmit}) => (
    <Row style={{marginTop: 10}}>
        <Col span={18}>
            <Form.Item>
                <Input
                    name = 'makeToDo'
                    type='text'
                    onChange={onChange}
                    value={value}>
                </Input>
        </Form.Item>
        </Col>

        <Col span={6}>
            <div style={{float: "right"}}>
                <Button loading={submitting} onClick={onSubmit}
                type="primary" style={{fontSize: 18}}>Add to-do</Button>
            </div>
        </Col>
    </Row>
);

class IndividualPage extends React.Component{

    constructor(props){
        super(props);
        
        this.state={
            point: 0,
            submitting: false,
            todo: [],
            completed: [],
            feed: [],
            userName: "",
            makeToDo:"",
            // newUser: true
        }

        this.handleChange=this.handleChange.bind(this);
    }

    handleChange = (e) => {
        let nextState={};
        nextState[e.target.name]=e.target.value;
        this.setState(nextState);
    }

    handleOk=()=>{
        console.log(this.props.history);
        // this.props.history.push('/uploadpost');
        Modal.destroyAll();
    }

    handleSubmit = () => {
        if (!this.state.makeToDo) {
          return;
        }

        if(this.state.todo.length==0){
            Modal.info({
                title: "Now, let's write your first post.",
                content: (
                    <div>
                        Let's write first post on your first to-do list, 
                        <br></br>'Making a project name'.
                        <div style={{float: "right", marginTop: 20}}>
                            <Button type="primary" onClick={this.handleOk}>
                                <a href="/uploadpost/true">GO</a>
                            </Button>
                        </div>
                    </div>  
                ),
                width: 500,
                centered: true,
                okButtonProps: {style: {display: "none"}},
                onCancel(){}
              });   
        }

        this.setState({
          submitting: true,
        });
    
        setTimeout(() => {
        backend_makeToDo(this.props.userName, this.state.makeToDo)
          this.setState({
            submitting: false,
            todo: [
              ...this.state.todo,
              {
                check: false,
                todo:this.state.makeToDo
              },
            ],
            makeToDo:""
          });
        }, 1000);
      };
    
    componentWillMount(){
        this.getMyPost();
        this.getMyToDo();
        this.getMarker();
    }
    
    getMyPost = async () => {
        const snapshot = await db.collection('Feeds').where("id","==",this.props.userName).get()
        console.log(snapshot.docs)
        this.setState({feed:snapshot.docs})
    }

    getMyToDo = async () =>{
        const todo = await db.collection("Users").doc(this.props.userName).collection("todo").where('check','==',false).get();
        const completed = await db.collection("Users").doc(this.props.userName).collection("todo").where('check','==',true).get();

        this.setState({todo:todo.docs.map(doc=>doc.data())});
        this.setState({completed:completed.docs.map(doc=>doc.data())});

    }

    getMarker = async () => {
        const snapshot = await db.collection('Users').doc(this.props.userName).get()
        console.log(snapshot.data().point)
        this.setState({point:snapshot.data().point})  
    }

    render(){
        const MyView=(
            <div style={{width: 1000, margin: "auto", marginTop: 20}}>
                <MyFeed feed={this.state.feed}></MyFeed>
            </div>
        )

        const BookmarkView=(
            <Row>
                <Progress
                strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                }}
                percent={this.state.completed.length/(this.state.todo.length+this.state.completed.length)*100}
                style={{marginBottom: 20}}
                />

                <Col span={12} style={{paddingRight: 5}}>
                    <Row>
                        <Col span={20}>
                            <h5>To-do List</h5>
                        </Col>
                        <Col span={4}>
                            <div style={{float: "right"}}>
                                <Popover
                                title="What are the examples of to-do list?"
                                content={(
                                    <div>
                                        <p>Make tab structure</p>
                                        <p>Implement authentication</p>
                                    </div>
                                )}>
                                <QuestionCircleOutlined style={{fontSize: 20}}/>
                                </Popover>
                            </div>
                        </Col>
                    </Row>

                    <List
                        bordered
                        dataSource={this.state.todo}
                        renderItem={item => (
                            <List.Item>
                                {item.todo}
                            </List.Item>
                        )}
                    />
                    {window.sessionStorage.getItem("id")===this.props.userName ? 
                    <Editor 
                    onChange ={this.handleChange} 
                    onSubmit={this.handleSubmit}
                    submitting={this.state.submitting}
                    value={this.state.makeToDo}
                    /> :
                    null}
                </Col>

                <Col span={12} style={{paddingLeft: 5}}>
                    <h5>Completed!</h5>
                    <List
                        bordered
                        dataSource={this.state.completed}
                        renderItem={item => (
                            <List.Item>
                                {item.todo}
                            </List.Item>
                        )}
                    />
                    {window.sessionStorage.getItem("id")===this.props.userName ? 
                    <Button type='primary' style={{float: "right", marginTop: 10}}>
                        <Link to={"/uploadpost/false"} style={{fontSize: 18}}>Add Completed</Link>
                    </Button> : null
                    }
                </Col>
            </Row>
        )

        var point=parseInt(this.state.point);
        const level=this.props.getLevel(point);
        var prevPoint=0;
        var nextPoint=0;
        let profileTree=null;
        let currentTree=null;
        let nextTree=null;

        switch (level) {
            case 1:
                prevPoint=10;
                nextPoint=30;
                profileTree=<img src={lv1}></img>
                currentTree=<img src={lv1} style={{width: 120}}></img>
                nextTree=<img src={lv2} style={{width: 70, marginTop: 50}}></img>
                break;
            case 2:
                prevPoint=30;
                nextPoint=60;
                profileTree=<img src={lv2}></img>
                currentTree=<img src={lv2} style={{width: 120}}></img>
                nextTree=<img src={lv3} style={{width: 70, marginTop: 50}}></img>
                break;
            default:
                prevPoint=0;
                nextPoint=10;
                profileTree=<img src={lv0}></img>
                currentTree=<img src={lv0} style={{width: 120}}></img>
                nextTree=<img src={lv1} style={{width: 70, marginTop: 50}}></img>
                break;
        }

        return (
            <div style={{fontFamily: 'Roboto', paddingBottom: 30}}>
                <div style={{width: 1000, margin: "auto", fontSize: 25, marginTop: 20, fontWeight: "bold"}}>
                    Welcome to {this.props.userName} Page
                </div>

                <Card style={{width: 1000, hegith: 200, margin: "auto", marginTop: 10}}>                
                    <Row> {/* Sum=24 */}
                        <Col span={4}>
                            <Avatar size={120} icon={profileTree}></Avatar>
                        </Col>
    
                        <Col span={8}>
                            <div style={{marginTop: 5, fontWeight: "bold", fontSize: 20}}>{this.props.userName}</div>
                            <div style={{marginTop: 10, fontSize: 18}}>Joined Today.</div>
                            <div style={{marginTop: 10, fontSize: 18}}>KAIST School of Computing</div>
                        </Col>
    
                        <Col span={12}>
                            <Row>
                                <Col span={6}>
                                    {currentTree}
                                </Col>
                                <Col span={12}>
                                    <div style={{marginTop: 25, fontWeight: "bold"}}>{nextPoint-point} points left to grow up!</div>
                                    <Slider max={nextPoint-prevPoint} value={point-prevPoint} tooltipVisible disabled={true} style={{marginTop: 50}}></Slider>
                                </Col>
                                <Col span={6}>
                                    {nextTree}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>

                <div style={{width: 1000, margin: "auto"}}>
                    <Tabs defaultActiveKey="1" type="card" size={"large"} style={{margin: "auto", marginTop: 20}}>
                        <TabPane tab="TO DO" key="1">
                            {BookmarkView}
                        </TabPane>
                        <TabPane tab="FEED" key="2">
                            {MyView}
                        </TabPane>
                    </Tabs>
                </div>

            </div>
        );
    }
};

IndividualPage.propTypes={
    userName: PropTypes.string,
};

IndividualPage.defaultProps={
    userName: "ddiddu",
};

const mapStateToProps=(state)=>{
    return{
        status: state.authentication.status
    };
};

const mapDispatchToProps=(dispatch)=>{
    return{
        getLevel: (point)=>{
            return getLevel(point);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndividualPage);