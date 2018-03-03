import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import './ListingItem.css';

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
        <Card className={this.state.cardClass} style={this.cardStyle} onClick={this.handleClick} >
          <CardMedia>
            <img src={this.props.listing.Images[0].url_170x135} alt={this.props.listing.title.substr(0,80)} />
          </CardMedia>
          <CardTitle
            subtitle={this.props.listing.title.split(' ').filter((el, i) => {
            return i < 3
            }).join(' ') + '...'}
          />
          {/* <CardActions>
            <RaisedButton label="Select" primary={true} style={this.buttonStyle} onClick={() => {this.props.onSelectListing(this.props.listing)}} />
          </CardActions> */}
        </Card>
      </div>
    )
  }
}

export default ListingItem
