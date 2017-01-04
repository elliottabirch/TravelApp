// ResultsPage
    // NavBar
    // EntityList
      // EntityListEntry
    // Map

import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../helpers';
import NavBar from './NavBar.jsx';
import EntityList from './EntityList.jsx';
import EntityPopup from './EntityPopup.jsx';
import Map from './Map.jsx';


class ResultsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entities: props.entities,
      waypoints: [],
      selectedEntity: {},
      showModal: false,
    };

    this.handleEntityClick = this.handleEntityClick.bind(this);
    this.handleEntityModalCloseClick = this.handleEntityModalCloseClick.bind(this);
    this.handleAddToItineraryClick = this.handleAddToItineraryClick.bind(this);
  }
  componentWillMount() {
    this.props.handlePlanButtonClick();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      entities: nextProps.entities,
    });
  }

  handleEntityClick(e, entity) {
    this.setState({
      selectedEntity: entity,
      showModal: true,
    });
  }

  handleEntityModalCloseClick() {
    this.setState({
      showModal: false,
    });
  }

  handleAddToItineraryClick(e) {
    const waypoints = this.state.waypoints.slice();
    const indexOf = waypoints.indexOf(e.currentTarget.dataset.latlng);
    if (indexOf === -1) {
      waypoints.push(e.currentTarget.dataset.latlng);
    } else {
      waypoints.splice(indexOf, 1);
    }
    this.setState({
      waypoints,
    }, () => { console.log('WAYPOINTS', waypoints); });
  }

  render() {
    return (
      <div className="resultsPage">
        <FancyBorder color="orange">
          <div className="row">
            <NavBar />
          </div>
          <div className="row mapAndList">
            <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8" >
              <Map
                userQuery={this.props.userQuery}
                entities={this.state.entities}
                waypoints={this.state.waypoints}
              />
            </div>
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <EntityList
                entities={this.props.entities} handleEntityClick={this.handleEntityClick}
                handleAddToItineraryClick={this.handleAddToItineraryClick}
                waypoints={this.state.waypoints}
              />
            </div>
          </div>
          <div className="container">
            {this.state.showModal ? <EntityPopup showModal={this.state.showModal} entity={this.state.selectedEntity} handleEntityModalCloseClick={this.handleEntityModalCloseClick} /> : null }
          </div>
        </FancyBorder>
      </div>
    );
  }
}

ResultsPage.propTypes = {
  userQuery: PropTypes.object,
  entities: PropTypes.arrayOf(PropTypes.object),
  handlePlanButtonClick: PropTypes.func,
};

export default ResultsPage;