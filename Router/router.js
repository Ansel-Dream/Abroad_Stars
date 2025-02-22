const express = require('express');
const router = express.Router();
const controls = require('./controllers/controls');
const { upload } = require('../middlewears/multer')

router.route('/').get(controls.home);

router.route('/fee').get(controls.fee);

router.route('/about').get(controls.About_get);

router.route('/apply').get(controls.apply_get).post(upload.fields([{ name: 'matric', maxCount: 1 }, { name: 'Inter', maxCount: 1 }]), controls.apply_post);

router.route('/medical').get(controls.medical);

router.route('/gallery').get(controls.gallery)

router.route('/education').get(controls.education);

router.route('/research').get(controls.research);

router.route('/anatomy').get(controls.anatomy);

router.route('/library').get(controls.LIBRARY);

router.route('/computer').get(controls.computer);

router.route('/hostel').get(controls.hostel_path);

router.route('/university').get(controls.university_path);

router.route('/admin/delete/:id').get(controls.admin_delete);

router.route('/admin/dashboard').get(controls.admin_dashboard);

router.route('/admin/edit/:id').get(controls.admin_edit).put(controls.admin_editing);

router.route('/contact').get(controls.contact_us_get).post(controls.contact_us_post);

router.route('/admin/login').get(controls.admin_login_get).post(controls.admin_login);

router.route('/admin/search').get(controls.admin_search).post(controls.admin_search_post);

router.route('*').get(controls.error_page);

// Exporting the router
module.exports = router;
