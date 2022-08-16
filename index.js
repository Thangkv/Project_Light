const express = require("express");
const app = express();
const port = process.env.PORT | 5555;

app.engine('html', require('ejs').renderFile);

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
// var stack0 = null;
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
app.get("/trangchu",function (req,res) {
    count++;
    /// truy van dc db để lấy dữ liệu sản phẩm
    const sql_txt = "SELECT * FROM products INNER JOIN\n" +
        "\t(select SUM(Quantity) as Số_lượng,ProductID from OrderProducts B group by ProductID) B\n" +
        "    ON products.PID = B.ProductID order by Số_lượng desc LIMIT 8;" + "SELECT * FROM `products` order by TimePost DESC LIMIT 8";
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("404 not found");
        else{
            console.log('kết nối thành công');
            var products = data[0];
            var products_new = data[1];
            // res.send(data);
            res.render("trangchu",{
                "count":count,
                "products":products,
                "products_new":products_new
            });
        }
    })

})
app.get("/test",function (req,res) {
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
            res.render("trangchu",{
                "count":count,
                "products":products,
                "products_new":products_new
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

app.get("/danhsachsanpham",function (req,res) {

    /// truy van dc db để lấy ds sinh viên
    const sql_txt = "SELECT * FROM `products`";
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("404 not found");
        else{
            var products = data;
            res.render("danhsachsanpham",{
                "products":products
            });
        }
    })

});

app.get("/dentrangtri",function (req,res) {

    /// truy van dc db để lấy ds sinh viên
    const sql_txt = "SELECT * FROM `products` WHERE CategoryID=2;";
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("404 not found");
        else{
            var products = data;
            res.render("dentrangtri",{
                "products":products
            });
        }
    })

});

app.get("/products-detail",function (req,res) {
    // phải tìm cách lấy đc giá trị tham số trên url
    var PID = req.query.PID;

    const sql_txt = "select * from products where PID like '" +PID+"';"

    conn.query(sql_txt,function (err,data) {
        if(err) res.send("Error");
        else{

                var products = data;
                // res.send(data);
                res.render("product_detail",{
                    "products":products
                });
        }
    })

})
app.get("/danhsachsanpham_duoi500k",function (req,res) {

    /// truy van dc db để lấy ds sinh viên
    const sql_txt = "SELECT * FROM `products` WHERE Price < 500000;";
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("404 not found");
        else{
            var products = data;
            res.render("danhsachsanpham_duoi500k",{
                "products":products
            });
        }
    })

});
app.get("/danhsachsanpham_tren500k",function (req,res) {

    /// truy van dc db để lấy ds sinh viên
    const sql_txt = "SELECT * FROM `products` WHERE Price >= 500000;";
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("404 not found");
        else{
            var products = data;
            res.render("danhsachsanpham_tren500k",{
                "products":products
            });
        }
    })

});

app.get("/products-search",function (req,res) {
    var KEY = req.query.input1;
    console.log(KEY);
    const sql_txt = "SELECT * FROM `products` WHERE Name LIKE '%" +KEY+"%';"
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("Error");
        else{
            var products = data;
            res.render("test2",{
                "products":products
            });
        }
    })
})

app.get("/gioithieu",function (req,res) {
    // count++;
    // /// truy van dc db để lấy dữ liệu sản phẩm
    // const sql_txt = "select * from products";
    // conn.query(sql_txt,function (err,data) {
    //     if(err) res.send("404 not found");
    //     else{
    //         console.log('kết nối thành công');
    //         var products = data;
    //         // res.send(data);
            res.render("gioithieu",{
                // "count":count,
                // "products":products
            });
    //     }
    // })

})