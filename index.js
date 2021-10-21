const express = require("express");
const app = express();
var morgan = require('morgan')
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const userRoute = require("./routes/user")

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Library API",
			version: "1.0.0",
			description: "A simple Express Library API",
		},
		servers: [
			{
				url: "http://localhost:5002",
			},
		],
	},
	apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options)

// console.log(specs);

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(specs))

app.use(express.json())
app.use(morgan('dev'))

app.use("/user",userRoute)

app.listen(5002,()=>{
    console.log('server connected at port 5002');
})