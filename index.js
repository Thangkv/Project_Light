const express = require("express");
const app = express();
const port = process.env.PORT | 5555;

app.listen(port,function () {
    console.log("server is running..");
});
app.set("view engine","ejs");
app.use(express.static("public")); // cho phep truy cap cac file static

const mysql = require("mysql");
const conn = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "project_light",
    multipleStatements: true
});
var count = 0;
// list route
app.get("/",function (req,res) {
    count++;
    /// truy van dc db để lấy dữ liệu sản phẩm
    const sql_txt = "select * from products";
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("404 not found");
        else{
            console.log('kết nối thành công');
            var products = data;
            // res.send(data);
            res.render("home",{
                "count":count,
                "products":products
            });
        }
    })

})
app.get("/demo",function (req,res) {
    count++;
    res.render("demo");
});

app.get("/bong-da",function (req,res) {
    count++;
    res.send({name:"Nguyễn Văn An",age:18});
});
app.get("/test",function (req,res) {
    count++;
    /// truy van dc db để lấy dữ liệu sản phẩm
    const sql_txt = "SELECT * FROM products INNER JOIN\n" +
        "\t(select SUM(Quantity) as Số_lượng,ProductID from OrderProducts B group by ProductID) B\n" +
        "    ON products.PID = B.ProductID order by Số_lượng desc LIMIT 6";
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("404 not found");
        else{
            console.log('kết nối thành công');
            var products = data;
            // res.send(data);
            res.render("home",{
                "count":count,
                "products":products
            });
        }
    })

})
app.get("/test1",function (req,res) {
    count++;
    /// truy van dc db để lấy dữ liệu sản phẩm
    const sql_txt = "SELECT * FROM products INNER JOIN\n" +
        "\t(select SUM(Quantity) as Số_lượng,ProductID from OrderProducts B group by ProductID) B\n" +
        "    ON products.PID = B.ProductID order by Số_lượng desc LIMIT 6;" + "SELECT * FROM `products` order by TimePost DESC LIMIT 6";
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("404 not found");
        else{
            console.log('kết nối thành công');
            var products = data[0];
            var products_new = data[1];
            // res.send(data);
            res.render("home1",{
                "count":count,
                "products":products,
                "products_new":products_new
            });
        }
    })

})