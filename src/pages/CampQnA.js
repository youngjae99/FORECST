import React, { Component } from 'react';
import {Table, Button, Row, Col, Input} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import {db} from '../firebase';

class CampQnA extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        data: [],
    };
  }

  componentDidMount(){
      this.getMarker();
  }

  getMarker = async () => {
      const snapshot = await db.collection('QnAList').orderBy("date","desc").get()
      console.log(snapshot.docs)
      this.setState({data:snapshot.docs.map(doc=>doc.data())})  
  }

  state = {
      sortedInfo: null,
      searchText: '',
      searchedColumn: '',
  };

  handleChange = (pagination, sorter) => {
      console.log('Various parameters', pagination, sorter);
      this.setState({
        sortedInfo: sorter,
      });
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
        type="primary"
        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
        icon={<SearchOutlined />}
        size="small"
        style={{ width: 90 }}
        >
        Search
        </Button>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  
  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render(){
      let {sortedInfo} = this.state;
      sortedInfo = sortedInfo || {};
      const columns = [
          {
              title: 'Title',
              dataIndex: 'title',
              key: 'title',
              align: 'center',
              ...this.getColumnSearchProps('title'),
              render: text =>
                <Link to={{pathname: `/campqnaview/${text}`}}>
                  <a>{text}</a>
                </Link>
          },
          {
              title: 'Writer',
              dataIndex: 'writer',
              key: 'writer',
              align: 'center',
              ...this.getColumnSearchProps('writer'),
          },
          {
              title: 'Date',
              dataIndex: 'date',
              key: 'date',
              align: 'center',
              ...this.getColumnSearchProps('date'),
              render: now => new Date(now).getFullYear() + "-" + (new Date(now).getMonth() + 1) + "-" + new Date(now).getDate() + " " + new Date(now).getHours() + ":" + new Date(now).getMinutes() + ":" + new Date(now).getSeconds() + " "
          },
      ]

      return(
        <div style={{padding:20, paddingTop:10, paddingBottom: 140}}>
          <div style={{fontSize: 30, fontWeight: "bold"}}>
            QNA Board
          </div>

          <Row>
            <Col span={20}>
              <div style={{fontSize: 16, paddingBottom: 10}}>
                Ask Questions Freely!
              </div>
            </Col>
            <Col span={4}>
              <Button type="primary" style={{float: "right", marginBottom: 10}}>
                <Link to="/qnawrite">WRITE</Link>
              </Button>
            </Col>
          </Row>
          
          <Table columns={columns} dataSource={this.state.data} onChange={this.handleChange} pagination={{position: ["bottomCenter"],pageSize: 10}}/>
        </div>
      )
    }
};

export default CampQnA;