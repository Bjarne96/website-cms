import React, { Component } from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import { Loader } from "semantic-ui-react";

interface IState {
	loading: boolean;
}


export class NavBar extends Component<{}, IState> {
	constructor(props) {
		super(props);
		this.state = {
			loading: true
		}
	}

	scrollToTop = () => {
		scroll.scrollToTop();
	};

	componentDidMount() {
		this.setState({loading: true})
	}

  render() {
	  return <></>
		if(this.state.loading) return <Loader active />
		return (
		<nav className="nav" id="navbar">
			<div className="nav-content">
			<ul className="nav-items">
				<li className="nav-item">
				<Link
					activeClass="active"
					to="div1"
					spy={true}
					smooth={true}
					offset={-70}
					duration={500}
				>
					Section 1
				</Link>
				</li>
				<li className="nav-item">
				<Link
					activeClass="active"
					to="div2"
					spy={true}
					smooth={true}
					offset={-70}
					duration={500}
				>
					Section 2
				</Link>
				</li>
				<li className="nav-item">
				<Link
					activeClass="active"
					to="div3"
					spy={true}
					smooth={true}
					offset={-70}
					duration={500}
				>
					Section 3
				</Link>
				</li>
				<li className="nav-item">
				<Link
					activeClass="active"
					to="div4"
					spy={true}
					smooth={true}
					offset={-70}
					duration={500}
				>
					Section 4
				</Link>
				</li>
				<li className="nav-item">
				<Link
					activeClass="active"
					to="div5"
					spy={true}
					smooth={true}
					offset={-70}
					duration={500}
				>
					Section 5
				</Link>
				</li>
			</ul>
			</div>
		</nav>
	);
  }
}

export default NavBar;
