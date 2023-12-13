import React from "react";
import {
	useHistory,
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams,
	useRouteMatch,
} from "react-router-dom";
import CreateNewsPage from "../components/CreateNewsPage";

function NewsScreen() {
	const history = useHistory();

	return <div>News Screen</div>;
}

export default NewsScreen;
