import React from 'react';
import logo from './logo.svg';
import './App.css';
import FeedCard from "./FeedCardComponent/FeedCardComponent";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedData: [],
      pageNo: 1,
      noResultFlag: false
    }
  }

  componentDidMount() {
    this.fetchFeedData(this.state.pageNo)
  }

  fetchFeedData = (pageNo) => {

    let pageLinkMap = {
      1: "59b3f0b0100000e30b236b7e",
      2: "59ac28a9100000ce0bf9c236",
      3: "59ac293b100000d60bf9c239"
    }

    function pageLinkMapFilter(pageNo) {
      if (pageLinkMap[pageNo] === '' || pageLinkMap[pageNo] === undefined) {
        return pageLinkMap[pageNo];
      } else {
        return pageLinkMap[pageNo];
      }
    }

    let feedID = pageLinkMapFilter(pageNo);

    fetch(`http://www.mocky.io/v2/${feedID}`)
      .then(response => { return response.json() })
      .then(data => {
        console.log("data is", data);
        if (data) {
          this.setState({
            feedData: data.posts,
            pageNo: data.page
          })
        }
        else {
          this.setState({
            noResultFlag: true,
            feedData: data.posts,
          })
        }
      })
  }

  render() {

    let feedData = this.state.feedData;



    return (
      <div className="App" >
        TEST SPACE
        {feedData.map((obj) => {
          return (
            <FeedCard
              feedData={obj}
            ></FeedCard>
          )
        })}


      </div>
    );
  }
}

export default App;
