import React from 'react';
import {Card, Avatar, Row, Col, Tabs, Slider, Button} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import lv0 from '../level_tree/lv0.png';
import lv1 from '../level_tree/lv1.png';
import lv2 from '../level_tree/lv2.png';
import lv3 from '../level_tree/lv3.png';

const {TabPane}=Tabs;

class MyPage extends React.Component{

    constructor(props){
        super(props);
        
        this.state={
            point: 0,
        }
    }

    render(){
        const MyView=(
            <div style={{width: 1000, margin: "auto", marginTop: 20}}>
                    MY VIEW
            </div>
        )

        const BookmarkView=(
            <div style={{width: 1000, margin: "auto", marginTop: 20}}>
                    BOOKMARK VIEW
            </div>
        )

        var level=0;
        var point=this.state.point;
        var nextPoint=0;

        if(point<parseInt("10")){
            level=0;
            nextPoint=10;
        }else if(point<parseInt("30")){
            level=1;
            nextPoint=30;
        }else{
            level=2;
            nextPoint=60;
        }

        let currentTree=null;
        let nextTree=null;

        switch (level) {
            case 1:
                currentTree=<img src={lv1} style={{width: 120}}></img>
                nextTree=<img src={lv2} style={{width: 70, marginTop: 50}}></img>
                break;
            case 2:
                currentTree=<img src={lv2} style={{width: 120}}></img>
                nextTree=<img src={lv3} style={{width: 70, marginTop: 50}}></img>
                break;
            default:
                currentTree=<img src={lv0} style={{width: 120}}></img>
                nextTree=<img src={lv1} style={{width: 70, marginTop: 50}}></img>
                break;
        }

        return (
            <div style={{fontFamily: 'Roboto'}}>
                <div style={{width: 1000, margin: "auto", fontSize: 25, marginTop: 20, fontWeight: "bold"}}>
                    My Page
                </div>

                <Card style={{width: 1000, hegith: 200, margin: "auto", marginTop: 10}}>                
                    <Row> {/* Sum=24 */}
                        <Col span={4}>
                            <Avatar size={120} icon={<UserOutlined></UserOutlined>}></Avatar>
                        </Col>
    
                        <Col span={8}>
                            <div style={{marginTop: 5, fontWeight: "bold", fontSize: 20}}>{this.props.status.currentUser}</div>
                            <div style={{marginTop: 10, fontSize: 18}}>Joined Today.</div>
                            <div style={{marginTop: 10, fontSize: 18}}>KAIST School of Computing</div>
                        </Col>
    
                        <Col span={12}>
                            <Row>
                                <Col span={6}>
                                    {currentTree}
                                </Col>
                                <Col span={12}>
                                    <div style={{marginTop: 25, fontWeight: "bold"}}>{nextPoint} points left to grow up!</div>
                                   <Slider max={nextPoint} defaultValue={this.state.point} tooltipVisible disabled={true} style={{marginTop: 50}}></Slider>
                                </Col>
                                <Col span={6}>
                                    {nextTree}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>

                <Row style={{width: 1000, margin: "auto"}}>
                    <Col span={20}>
                        <Tabs defaultActiveKey="1" type="card" size={"large"} style={{margin: "auto", marginTop: 20}}>
                            <TabPane tab="MY" key="1">
                                {MyView}
                            </TabPane>
                            <TabPane tab="BOOKMARK" key="2">
                                {BookmarkView}
                            </TabPane>
                        </Tabs>
                    </Col>

                    <Col span={4} style={{textAlign: "right"}}>
                        <Button type='primary' style={{marginTop: 20}}>
                            <Link to={"/uploadpost"} style={{fontSize: 18}}>New Post</Link>
                        </Button>
                    </Col>
                </Row>

            </div>
        );
    }
};

const mapStateToProps=(state)=>{
    return{
        status: state.authentication.status
    };
};

const mapDispatchToProps=(dispatch)=>{
    return{
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);