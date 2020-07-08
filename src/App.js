import React from 'react';
import './App.css';
import FeedCard from "./FeedCardComponent/FeedCardComponent";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedData: [],
      pageNo: 1,
      noResultFlag: true,
      firstLoadFlag: true
    }

    this.fetchFeedData = this.fetchFeedData.bind(this);
    this.buttonDisableLogic = this.buttonDisableLogic.bind(this);
    this.getDataHandler = this.getDataHandler.bind(this);
  }



  componentDidMount() {
    this.setState({
      firstLoadFlag: true
    })
    // this.fetchFeedData(this.state.pageNo);
    // this.buttonDisableLogic(this.state.pageNo)
  }

  componentDidUpdate() {
    if (this.state.firstLoadFlag === false)
      this.buttonDisableLogic(this.state.pageNo);
  }


  getDataHandler = () => {
    this.fetchFeedData(this.state.pageNo);
  }

  buttonDisableLogic = (pageNo) => {
    if (pageNo <= 1) {
      let element = document.querySelector(".prevButton")
      element.setAttribute("disabled", "disabled");
    }
    else if (pageNo >= 3) {
      let element = document.querySelector(".nextButton")
      element.setAttribute("disabled", "disabled");
    }
    else {
      let element1 = document.querySelector(".prevButton")
      element1.removeAttribute("disabled");
      let element2 = document.querySelector(".nextButton")
      element2.removeAttribute("disabled");
    }
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

    fetch(`https://www.mocky.io/v2/${feedID}`, { mode: 'cors' })
      .then(response => { return response.json() })
      .then(data => {
        // console.log("data is", data);
        if (data) {
          this.setState({
            firstLoadFlag: false,
            noResultFlag: false,
            feedData: data.posts,
            pageNo: data.page
          })
        }
        else {
          this.setState({
            firstLoadFlag: false,
            noResultFlag: true,
            feedData: []
          })
        }
      })
      .catch(function (err) {
        this.setState({
          firstLoadFlag: false,
          noResultFlag: true,
          feedData: []
        })
        // alert("No data found !")
      })
  }



  changePageHandler = (e) => {
    let requestedPageNo = e.target.value;
    this.setState({
      pageNo: requestedPageNo
    })
    this.buttonDisableLogic(requestedPageNo);
    this.fetchFeedData(requestedPageNo);

  }

  render() {
    let feedData = this.state.feedData;
    return (
      <div className="App">
        <h3>
          YOUR FEEDS
        </h3>
        <button type="button" className="getData" onClick={this.getDataHandler}>GET DATA</button>
        <br></br>
        <hr></hr>

        {this.state.noResultFlag === true ? "Nothing to show!" :
          <div>
            PAGE - {this.state.pageNo}
            <br></br>
            <br></br>
            <button type="button" className="prevButton" value={(this.state.pageNo) - 1} onClick={this.changePageHandler} > Prev </button>
            <button type="button" className="nextButton" value={(this.state.pageNo) + 1} onClick={this.changePageHandler}> Next </button>
            {feedData.map((obj, idx) => {
              console.log()
              return (
                <div key={idx}>
                  <FeedCard
                    feedData={obj}
                  ></FeedCard>
                </div>
              )
            })}
          </div>
        }
        <br></br>
        <br></br>
        {
          this.state.firstLoadFlag === true ? "Click on GET DATA to begin!" : ""
        }
      </div>
    );
  }
}

export default App;
