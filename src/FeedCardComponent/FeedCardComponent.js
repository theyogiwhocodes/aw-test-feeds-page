
import React from 'react';

class FeedCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log("this.props", this.props)

    let data = this.props.feedData === undefined || this.props.feedData === "" ? "" : this.props.feedData;

    console.log("data inside component: ")
    console.log(data)

    return (
      <div className="feed">
        <p>UserID : {data.id}</p>
        <img src={data.thumbnail_image} alt="thumbnail_photo" height="100px" width="100px"></img>
        <p>Event Name: {data.event_name}</p>
        <p>Date: {data.event_date}</p>
        <p>Views: {data.views}</p>
        <p>Likes: {data.likes}</p>
        <p>Shares: {data.shares}</p>
      </div>
    )
  }



}

export default FeedCard;
