import React, {Component} from 'react';
import {Card, CardMedia, CardTitle} from 'material-ui/Card';
import './ListingItem.css';
import { CSSTransitionGroup } from 'react-transition-group' // ES6

//TODO: fix select card
//TODO: fix transition leave

class ListingItem extends Component {

  cardStyle = {
    width: 190
  };
  // buttonStyle = {
  //   marginLeft: 45
  // };
  state = {
    cardClass: ''
  }

  handleClick = () => {
    if (this.state.cardClass !== '') this.setState({cardClass: ''})
    else this.setState({cardClass: 'selectedCard'});

    this.props.onSelectListing(this.props.listing);
  }

  render () {
    return (
      <div className="ListingItem">
        <CSSTransitionGroup
          transitionName="fade-in-transition"
          transitionAppear={true}
          transitionAppearTimeout={200}
          transitionEnter={false}
          transitionLeave={true}
          transitionLeaveTimeout={200}>
          <Card key={this.props.listing.listing_id} className={this.state.cardClass} style={this.cardStyle} onClick={this.handleClick} >
            <CardMedia>
              <img src={this.props.listing.Images[0].url_170x135} alt={this.props.listing.title.substr(0,80)} />
            </CardMedia>
            <CardTitle
              subtitle={this.props.listing.title.split(' ').filter((el, i) => {
                return i < 3
              }).join(' ') + '...'}
            />
          </Card>
        </CSSTransitionGroup>
      </div>
    )
  }
}

export default ListingItem
