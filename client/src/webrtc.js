require('dotenv').config();
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider}  from 'react-redux';
import MetaTags from 'react-meta-tags';
import {BrowserRouter, BrowserHistory, matchPath, Switch, Route, Link} from 'react-router-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

import Video from './components/Video';
import {BUSINESS_NAME, BUSINESS_LOGO_SQUARE} from "babel-dotenv";

import configureStore from './store/configureStore.js';

const store = configureStore();

export default class WebRTC extends React.Component{

	constructor(props){
		super(props);
    }
    
	render(){
		return (
			<Provider store={store}>
				<BrowserRouter history={BrowserHistory}>
					<Route render={({ location }) => (
						<div className="background">
							<TransitionGroup>
								<CSSTransition key={location.key} classNames="pagefade" timeout={300}>
									<Switch location={location} >
										<Route exact path="/" component={PageShell(Video)} key="video" />
										<Route exact path="/:key" component={PageShell(Video)} key="video" />
									</Switch>
								</CSSTransition>
							</TransitionGroup>
						</div>
					)}/>
				</BrowserRouter>
			</Provider>
 		);
	}
}
const PageShell = Page => { 
    return props =>
		<div className="page">
			<BasicTags />
			<Page {...props} />
		</div>
};


class BasicTags extends React.Component{
	render(){
		return(
			<MetaTags>
				<title>{BUSINESS_NAME}</title>
			    <meta name="twitter:title" content={BUSINESS_NAME} />
			    <meta property="og:title" content={BUSINESS_NAME} />
			    <meta property="og:site_name" content={BUSINESS_NAME} />
			    <meta itemProp="name" content={BUSINESS_NAME} />

				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="shortcut icon" href={BUSINESS_LOGO_SQUARE} />
			</MetaTags>
		);
	}
}

ReactDOM.render(<WebRTC />,document.getElementById("webrtc"));