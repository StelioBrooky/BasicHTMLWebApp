exports.getIndex = (req, res) => {
    res.render('index', {pageTitle: 'Home Page', name:''});
}

exports.getAddPage = (req, res) => {
    res.render('addPage', {pageTitle: 'Admin Page', name:'Admin'});
};

exports.postAddPage = (req, res) => {
    res.render('index', {pageTitle: 'Home Page', name:''});
}