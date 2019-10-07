import { Link, withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';


import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='AMSie Can'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      content='Keeps track of bins for you'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Link to={`/signup`}>
    <Button primary size='huge'>
      Get Started
      <Icon name='right arrow' />
    </Button>
    </Link>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          // once={false}
          // onBottomPassed={this.showFixedMenu}
          // onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            className="backGround"
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '0em 0em'}}
            vertical
          >
            <Menu
            color="blue" inverted className="no-border"
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              
            >
              <Container>
              <Menu.Item>
                <Link to={`/signup`}>
                  <i className="trash icon" style={{ color: 'white' }}></i> AMSie Can
                </Link>
              </Menu.Item>
                
                
                <Menu.Item position='right'>
                <Link to={`/login`}>
                  <Button className="tiny" as='a' inverted={!fixed}>
                    Log in
                  </Button>

          

                  </Link>
                  <Link to={`/signup`}>
                  <Button className="tiny" as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                  </Link>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation='push'
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as='a' active>
            Home
          </Menu.Item>
          <Menu.Item as='a'>Log in</Menu.Item>
          <Menu.Item as='a'>Sign Up</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
          className="backGround"
            inverted
            textAlign='center'
            style={{ minHeight: 350, padding: '1em 0em' }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size='large'>
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name='sidebar' />
                </Menu.Item>
                <Menu.Item position='right'>
                  <Button as='a' inverted>
                    Log in
                  </Button>

                  <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              The AMSie Can device tracks status
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              The device attaches to trash bins and can be customized. Sensors measure the volume of the
              the bin and sends data wirelessly to the AMSie Can web app.
            </p>
            <Header as='h3' style={{ fontSize: '2em' }}>
              THe AMSie Can web app
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              The web app is the interface that lets you see the status of bins. It allows you to
              see which bins are full and can automate when a can needs to be emptied. 
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>

          
            <Image bordered rounded size='large' src={require('../graphicResources/map.png')} />
            <br />
            <Image bordered rounded size='large' src={require('../graphicResources/webshot.png')} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: '0em' }} vertical>
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row textAlign='center'>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <div class="ui grid center aligned">
              <div class="three wide column">
                <Header as='h3' style={{ fontSize: '2em' }}>
                  <i className="trash icon" style={{ color: 'green' }}></i> 
                </Header>
                <p style={{ fontSize: '1.33em' }}>Empty</p>
              </div>
              <div class="three wide column">
                <Header as='h3' style={{ fontSize: '2em' }}>
                  <i className="trash icon" style={{ color: 'orange' }}></i> 
                </Header>
                <p style={{ fontSize: '1.33em' }}>Mid-Full</p>
              </div>
              <div class="three wide column">
                <Header as='h3' style={{ fontSize: '2em' }}>
                  <i className="trash icon" style={{ color: 'red' }}></i> 
                </Header>
                <p style={{ fontSize: '1.33em' }}>Full!</p>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Get Status of bins for efficient routes
            </Header>
            <p style={{ fontSize: '1.33em' }}>
             
               Bins are color coded to reflect status
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as='a'><Link to={`/signup`}> Signup</Link></List.Item>
                <List.Item as='a'><Link to={`/login`}>Login</Link></List.Item>
                
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Services' />
              <List link inverted>
                <List.Item as='a'><Link to={`/login`}>Check Status</Link></List.Item>
                <List.Item as='a'><Link to={`/login`}>Add Device</Link></List.Item>
                
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                More AMSie Products
              </Header>
              <p>
                See more AMSie products that are being created as a prototype
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
)
export default HomepageLayout