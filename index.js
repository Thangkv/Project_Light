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
    database: "eproject_v1",
    // database: "eprojectlight",
    // database: "project_light",
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

    const sql_txt = "SELECT * FROM `products` WHERE CategoryID=1";
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
app.get("/denoptran",function (req,res) {
    const sql_txt = "SELECT * FROM `products` WHERE CategoryID=3";
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("404 not found");
        else{
            var products = data;
            res.render("denoptran",{
                "products":products
            });
        }
    })
});
app.get("/denchum",function (req,res) {
        const sql_txt = "SELECT * FROM `products` WHERE CategoryID=4";
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("404 not found");
        else{
            var products = data;
            res.render("denchum",{
                "products":products
            });
        }
    })
});
app.get("/dencay",function (req,res) {
    const sql_txt = "SELECT * FROM `products` WHERE CategoryID=5";
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("404 not found");
        else{
            var products = data;
            res.render("dencay",{
                "products":products
            });
        }
    })
});
app.get("/dentha",function (req,res) {
    const sql_txt = "SELECT * FROM `products` WHERE CategoryID=6";
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("404 not found");
        else{
            var products = data;
            res.render("dentha",{
                "products":products
            });
        }
    })
});
app.get("/phillips",function (req,res) {
    const sql_txt = "select *,brands.Name as thuonghieu from products INNER JOIN brands ON products.BrandID = brands.BID WHERE BrandID=1";
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("404 not found");
        else{
            var products = data;
            res.render("dentheothuonghieu",{
                "products":products
            });
        }
    })
});
app.get("/osram",function (req,res) {
    const sql_txt = "select *,brands.Name as thuonghieu from products INNER JOIN brands ON products.BrandID = brands.BID WHERE BrandID=2";
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("404 not found");
        else{
            var products = data;
            res.render("dentheothuonghieu",{
                "products":products
            });
        }
    })
});
app.get("/cree",function (req,res) {
    const sql_txt = "select *,brands.Name as thuonghieu from products INNER JOIN brands ON products.BrandID = brands.BID WHERE BrandID=3";
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("404 not found");
        else{
            var products = data;
            res.render("dentheothuonghieu",{
                "products":products
            });
        }
    })
});
app.get("/nichia",function (req,res) {
    const sql_txt = "select *,brands.Name as thuonghieu from products INNER JOIN brands ON products.BrandID = brands.BID WHERE BrandID=4";
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("404 not found");
        else{
            var products = data;
            res.render("dentheothuonghieu",{
                "products":products
            });
        }
    })
});
app.get("/panasonic",function (req,res) {
    const sql_txt = "select *,brands.Name as thuonghieu from products INNER JOIN brands ON products.BrandID = brands.BID WHERE BrandID=5";
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("404 not found");
        else{
            var products = data;
            res.render("dentheothuonghieu",{
                "products":products
            });
        }
    })
});
app.get("/zumtobel",function (req,res) {
    const sql_txt = "select *,brands.Name as thuonghieu from products INNER JOIN brands ON products.BrandID = brands.BID WHERE BrandID=6";
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("404 not found");
        else{
            var products = data;
            res.render("dentheothuonghieu",{
                "products":products
            });
        }
    })
});
app.get("/cavani",function (req,res) {
    const sql_txt = "select *,brands.Name as thuonghieu from products INNER JOIN brands ON products.BrandID = brands.BID WHERE BrandID=7";
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("404 not found");
        else{
            var products = data;
            res.render("dentheothuonghieu",{
                "products":products
            });
        }
    })
});
// app.get("/products-detail",function (req,res) {
//
//     var PID = req.query.PID;
//     var xxxx = req.query.xxxx;
//     const sql_txt = "select * from products where PID like '" +PID+"';"
//
//     conn.query(sql_txt,function (err,data) {
//         if(err) res.send("Error");
//         else{
//             var products = data;
//             var products1 = data;
//                 // res.send(data);
//                 res.render("product_detail2",{
//                     xxxx:xxxx,
//                     "products":products,
//                     "products1":products1
//
//                 });
//         }
//     })
//
// })
app.get("/products-detail",function (req,res) {

    var PID = req.query.PID;
    var xxxx = req.query.xxxx;
    // const sql_txt = "select * from products where PID like '" +PID+"';\n" + "select * from products INNER JOIN categorys ON products.CategoryID = categorys.CaID WHERE categorys.CaID = (SELECT products.CategoryID FROM products WHERE products.PID LIKE '"+PID+"');"
    const sql_txt = "select Products.*,Brands.BID,Brands.Name as thuonghieu,Brands.Origin from Products INNER JOIN Brands ON Products.BrandID = Brands.BID where PID like '" +PID+"';\n" + "select * from products INNER JOIN categorys ON products.CategoryID = categorys.CaID WHERE categorys.CaID = (SELECT products.CategoryID FROM products WHERE products.PID LIKE '"+PID+"');"
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("Error");
        else{
            var products = data[0];
            var products1 = data[1];
            // res.send(data);
            res.render("product_detail2",{
                xxxx:xxxx,
                "products":products,
                "products1":products1

            });
        }
    })

})
app.get("/danhsachsanpham_duoi5000k",function (req,res) {

    const sql_txt = "SELECT * FROM `products` WHERE Price < 5000000;";
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("404 not found");
        else{
            var products = data;
            res.render("danhsachsanpham_duoi5000k",{
                "products":products
            });
        }
    })

});
app.get("/danhsachsanpham_tu5000k-10000k",function (req,res) {

    const sql_txt = "SELECT * FROM `products` WHERE Price >= 5000000 and Price < 10000000;";
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("404 not found");
        else{
            var products = data;
            res.render("danhsachsanpham_tu5000k-10000k",{
                "products":products
            });
        }
    })

});
app.get("/danhsachsanpham_tren10000k",function (req,res) {

     const sql_txt = "SELECT * FROM `products` WHERE Price >= 10000000;";
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("404 not found");
        else{
            var products = data;
            res.render("danhsachsanpham_tren10000k",{
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
            res.render("ketquatimkiem",{
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

app.get("/lienhe",function (req,res) {

    res.render("lienhe", {});
});
app.get("/giohang",function (req,res) {

    res.render("giohang",{
        });

})
app.get("/thongtinvanchuyen",function (req,res) {

    res.render("thongtinvanchuyen",{
    });

});
app.get("/dangky",function (req,res) {

    res.render("dangky",{
    });

});

app.get("/dangnhap",function (req,res) {

    res.render("dangnhap",{
    });

})
// app.get("/demo1",function (req,res) {
//     const search = req.query.search
//     var sql="select * from products where Name like '%"+search+"%'";
//     res.render("demo1",{
//         search:search
//        });
//
// })
app.get("/demo1",function (req,res) {
    const search = req.query.search
 // var sql="select * from products where Name like '%"+search+"%'";
    var sql_txt = "SELECT * FROM `products`";
    conn.query(sql_txt,function (err,data) {
        if (err) res.send("404 not found");
        else {
            var products = data;
            var products1 = data;
            var test = data[9];
            res.send(data);
            // res.render("demo1", {
            //     "products": products,
            //     "products1": products1,
            //      search:search,
            //      test:test,
            // });
        }
    })
})

app.get("/test3",function (req,res) {

    const sql_txt = "SELECT * FROM `products`";
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("404 not found");
        else{
            var products = data;
            var products1 = data;
            res.render("test3",{
                "products":products,
                "products1":products1
            });
        }
    })

});
// app.get("/test4",function (req,res) {
//
//     const sql_txt = "SELECT * FROM `products`";
//     conn.query(sql_txt,function (err,data) {
//         if(err) res.send("404 not found");
//         else{
//             var products = data;
//             var products1 = data;
//             res.send(data);
//             // res.render("demo1",{
//             //     "products":products,
//             //     "products1":products1,
//             //
//             // });
//         }
//     })
//
// })