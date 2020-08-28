import Head from "next/head";
import styles from "./Layout.module.scss";
import Navbar from "../Navbar/Navbar.component";
import SignInModal from "../Modals/Modal.component";
import Backdrop from "../Backdrop/Backdrop.component";

class Layout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signInOpen: false,
			signUpOpen: false,
		};
	}
	handleModalOpen() {}
	render() {
		return (
			<div>
				<Head>
					<title>JAM: Joining All Musicians</title>
					<link
						href='https://fonts.googleapis.com/css2?family=Lato&family=Open+Sans&display=swap'
						rel='stylesheet'
					/>
				</Head>
				<Backdrop />
				<Navbar />
				<SignInModal />
				{props.children}
			</div>
		);
	}
}

export default Layout;
