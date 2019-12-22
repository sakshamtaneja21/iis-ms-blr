/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('locatebin', {
    title: 'Locate Bin'
  });
};
