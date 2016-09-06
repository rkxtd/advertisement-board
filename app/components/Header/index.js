import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import { selectLocationState } from 'containers/App/selectors';


class Header extends React.Component {
  /**
   * Changes the route
   *
   * @param  {string} route The route we want to go to
   */
  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  navToPlaceAd = () => {
    this.openRoute('/postAdvertisement');
  };

  navToCategories = () => {
    this.openRoute('/categories');
  };

  navToHome = () => {
    this.openRoute('/');
  };
  render() {
    const currentUrl = this.props.activeUrlRoutine.locationBeforeTransitions.pathname;
    let stylesPointer = { cursor: 'pointer' };
    return (
      <header>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a onClick={this.navToHome} style={stylesPointer}>VLAB Project</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem onClick={this.navToCategories} active={(currentUrl === '/categories')}>Категорії</NavItem>
            </Nav>
            <Nav>
              <NavItem onClick={this.navToPlaceAd} active={(currentUrl === '/postAdvertisement')}><span className="glyphicon glyphicon-plus"></span> Додати Оголошення</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}

Header.propTypes = {
  changeRoute: React.PropTypes.func,
  activeUrlRoutine: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  activeUrlRoutine: selectLocationState(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Header);
