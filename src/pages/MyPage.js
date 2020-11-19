import React from 'react';
import {Card, Avatar, Row, Col, Tabs, Slider} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {connect} from 'react-redux';

const {TabPane}=Tabs;

class MyPage extends React.Component{

    constructor(props){
        super(props);
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
    
                        <Col span={10}>
                            <div style={{marginTop: 5, fontWeight: "bold", fontSize: 20}}>{this.props.status.currentUser}</div>
                            <div style={{marginTop: 10, fontSize: 18}}>Joined Today.</div>
                            <div style={{marginTop: 10, fontSize: 18}}>KAIST School of Computing</div>
                        </Col>
    
                        <Col span={10}>
                            <Slider defaultValue={0} tooltipVisible disabled={true} style={{marginTop: 100}}></Slider>
                        </Col>
                    </Row>
                </Card>

                <Tabs defaultActiveKey="1" type="card" size={"large"} style={{width: 1000, margin: "auto", marginTop: 20}}>
                    <TabPane tab="MY" key="1">
                        {MyView}
                    </TabPane>
                    <TabPane tab="BOOKMARK" key="2">
                        {BookmarkView}
                    </TabPane>
                </Tabs>
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