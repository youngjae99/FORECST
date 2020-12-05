import React, { Component } from 'react';
import {Table, Button, Space, Input} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import {db} from '../firebase';
import {backend_QnAList} from '../backend'; 

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
      const snapshot = await db.collection('QnAList').get()
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

  setNoSort = () => {
      this.setState({
          sortedInfo: {
          order: 'descend',
          columnKey: 'no',
          },
      });
  };

  setDateSort = () => {
      this.setState({
          sortedInfo: {
          order: 'descend',
          columnKey: 'date',
          },
      });
  };

  setLikesSort = () => {
      this.setState({
          sortedInfo: {
          order: 'descend',
          columnKey: 'likes',
          },
      });
  };

  setViewsSort = () => {
      this.setState({
          sortedInfo: {
          order: 'descend',
          columnKey: 'views',
          },
      });
  };

  parseTime = timestamp => {
    var date = new Date(timestamp);
    console.log('year is ' + date.getFullYear());
    return date.getMonth() + "." + date.getDate()+"  "+date.getHours()+":"+date.getMinutes();
  }

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
              title: 'No.',
              dataIndex: 'no',
              key: 'no',
              align: 'center',
              sorter: (a, b) => a.no - b.no,
              sortOrder: sortedInfo.columnKey === 'no' && sortedInfo.order,
              ellipsis: true,
              color: '#1890ff',
          },
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
              sorter: (a, b) => a.date - b.date,
              sortOrder: sortedInfo.columnKey === 'date' && sortedInfo.order,
              ellipsis: true,
          },
          {
              title: 'Likes',
              dataIndex: 'likes',
              key: 'likes',
              align: 'center',
              sorter: (a, b) => a.likes - b.likes,
              sortOrder: sortedInfo.columnKey === 'likes' && sortedInfo.order,
              ellipsis: true,
          },
          {
              title: 'Views',
              dataIndex: 'views',
              key: 'views',
              align: 'center',
              sorter: (a, b) => a.views - b.views,
              sortOrder: sortedInfo.columnKey === 'views' && sortedInfo.order,
              ellipsis: true,
          },
      ]

      return(
        <div style={{padding:20, paddingBottom: 140}}>
          <Space style={{marginBottom: 16}}>
            <Button onClick={this.setNoSort}>Sort by No.</Button>
            <Button onClick={this.setNoSort}>Sort by Date</Button>
            <Button onClick={this.setLikesSort}>Sort by Likes</Button>
            <Button onClick={this.setViewsSort}>Sort by Views</Button>
          </Space>
          
          <Button type="primary" style={{float: "right"}}>
            <Link to="/qnawrite">WRITE</Link>
          </Button>

          <Table columns={columns} dataSource={this.state.data} onChange={this.handleChange} pagination={{position: ["bottomCenter"]}}/>
        </div>
      )
    }
};

export default CampQnA;