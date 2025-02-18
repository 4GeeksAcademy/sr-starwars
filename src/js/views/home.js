import React from "react";

import "../../styles/home.css";
import { People } from "../component/people";
import { Planets } from "../component/planets";


export const Home = () => (
	<div className="text-center mt-5">
		<h1>personajes</h1>
		<People />
		<Planets />

	</div>

);