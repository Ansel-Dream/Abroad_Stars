const path = require('path')
const cloudinary = require(path.join(__dirname, '..', '..', 'Utils', 'cloudinary.js'))
const db = require(path.join(__dirname, '..', '..', 'Database', 'connection.js'));
const admin_db = require(path.join(__dirname, '..', '..', 'Database', 'admin_connection.js'));
const apply = require(path.join(__dirname, '..', '..', 'Database', 'apply_form.js'));
const fs = require('fs')

let error_page = (req, res) => {
    res.render('404')
}

//  * ————————————————————————————————————————————
//  There is the route of homepage
//  * ————————————————————————————————————————————

let home = (req, res) => {
    res.render('index')
}

//  * ————————————————————————————————————————————
//  There is the route of contact us page with get
//  * ————————————————————————————————————————————

let fee = (req, res) => {
    res.render('fee')
}

//  * ————————————————————————————————————————————
//  There is the route of contact us page with get
//  * ————————————————————————————————————————————

let contact_us_get = (req, res) => {
    res.render('contact', { success: '' });
}

//  * —————————————————————————————————————————————
//  There is the route of contact us page with post
//  * —————————————————————————————————————————————

let university_path = (req, res) => {
    res.render('university', { name: 'International University Of Kyrgyzstan', name2: '(IUK-ISM)', section_images: 'https://api.dsapsol.com/promos%20(bg).jpg', slogan:'(Recognized by PMDC Pakistan)' });
}

//  * —————————————————————————————————————————————
//  There is the route of contact us page with post
//  * —————————————————————————————————————————————

let hostel_path = (req, res) => {
    res.render('hostel', { name: 'Hostel',slogan : '', section_images: 'https://storage.googleapis.com/a1aa/image/RCzuPehNpQXiKKV5AfJQCE4KeRBj384OxiiicDUZ7U6louQoA.jpg' });
}

//  * —————————————————————————————————————————————
//  There is the route of contact us page with post
//  * —————————————————————————————————————————————

let contact_us_post = (req, res) => {
    const deta = req.body;
    // console.log(deta)
    db.create(deta).then(
        res.render('contact', { success: 'Submission successful!' })
    )
}
//  * ————————————————————————————————————————————
//  There is the route of appply Form with get
//  * ————————————————————————————————————————————

let gallery = (req, res) => {
    res.render('gallery');
}

//  * ————————————————————————————————————————————
//  There is the route of appply Form with get
//  * ————————————————————————————————————————————


let apply_get = (req, res) => {
    res.render('apply', { success: '' })
}

//  * ————————————————————————————————————————————
//  There is the route of appply Form with post
//  * ————————————————————————————————————————————

let apply_post = async (req, res) => {
    const { fullname, email, phone, message } = req.body;
    const matric_link = req.files['matric'] ? req.files['matric'][0].path : '';
    const Inter_link = req.files['Inter'] ? req.files['Inter'][0].path : '';

    try {
        const matricUpload = await cloudinary.uploadfile(matric_link);
        const matric = matricUpload.secure_url;
        const InterUpload = await cloudinary.uploadfile(Inter_link);
        const Inter = InterUpload.secure_url;
        const newApplication = new apply({
            fullname,
            email,
            phone,
            message,
            matric,
            Inter
        });

        fs.unlink(matric_link, (err) => {
            if (err) {
                console.error('Error deleting matric image:', err);
                return res.status(500).send('Error deleting matric image from the folder.');
            }

            console.log('Matric image deleted successfully!');
        });
        fs.unlink(Inter_link, (err) => {
            if (err) {
                console.error('Error deleting matric image:', err);
                return res.status(500).send('Error deleting matric image from the folder.');
            }

            console.log('Inter image deleted successfully!');
        });
        // Save the application
        await newApplication.save();
        res.render('apply', { success: 'Your Form Submitted Successfully' });
    } catch (error) {
        console.error('Error uploading files or saving application:', error);
        res.status(500).send('Error submitting application: ' + error.message);
    }
};


//  * ————————————————————————————————————————————
//  There is the route of medical with get
//  * ————————————————————————————————————————————

let medical = (req, res) => {
    res.render('Components/(IUK)/medical', { direction: 'row' })
}

//  * ————————————————————————————————————————————
//  There is the route of education with get
//  * ————————————————————————————————————————————

let education = (req, res) => {
    res.render('Components/(IUK)/education', { direction: 'row' })
}

//  * ————————————————————————————————————————————
//  There is the route of research with get
//  * ————————————————————————————————————————————

let research = (req, res) => {
    res.render('Components/(IUK)/research', { direction: 'row' })
}

//  * ————————————————————————————————————————————
//  There is the route of admin_dashboard with get
//  * ————————————————————————————————————————————

let anatomy = (req, res) => {
    res.render('Components/(IUK)/anatomy', { direction: 'row' })
}

//  * ————————————————————————————————————————————
//  There is the route of admin_dashboard with get
//  * ————————————————————————————————————————————

let LIBRARY = (req, res) => {
    res.render('Components/(IUK)/LIBRARY', { direction: 'row' })
}

//  * ————————————————————————————————————————————
//  There is the route of admin_dashboard with get
//  * ————————————————————————————————————————————

let computer = (req, res) => {
    res.render('Components/(IUK)/computer', { direction: 'row' })
}

//  * ————————————————————————————————————————————
//  There is the route of admin_dashboard with get
//  * ————————————————————————————————————————————

let About_get = (req, res) => {
    res.render('about_us')
}


//  * ————————————————————————————————————————————
//  There is the route of admin_dashboard with get
//  * ————————————————————————————————————————————

let admin_login_get = (req, res) => {
    res.render('admin/login')
}
let admin_email = null

let admin_login = async (req, res) => {
    data = req.body
    admin_email = await admin_db.findOne({ email: data.email })
    if (admin_email) {
        console.log('admin is available')
        res.redirect('/admin/dashboard')
    } else {
        console.log('Not a admin')
    }
    // if (admin) {
    //     console.log(data)
    //     return admin.email;
    // } else {
    //     res.status(401).send('Invalid email or password');
    // }
}

let admin_dashboard = async (req, res) => {

    // let admin_email = await admin_login(req, res);
    if (admin_email) {
        let comming_data = await db.find()
        let total_data = await db.countDocuments();
        res.render('admin/dashboard', { comming_data, total_data, success: '' })
    } else {
        res.send('<h1 align="center">You are not eligible</h1>')
    }
}


//  * ————————————————————————————————————————————
//  There is the route of admin edit page with get
//  * ————————————————————————————————————————————

let admin_edit = async (req, res) => {
    let comming_name = req.params.id
    let finalname = await db.findOne({ Name: comming_name })
    res.render('admin/update', { finalname })
}

//  * ————————————————————————————————————————————
//  There is the route of admin edit page with post
//  * ————————————————————————————————————————————

let admin_editing = async (req, res) => {
    let comming_name = req.params.id;
    console.log(comming_name)
    await db.updateOne({ Name: comming_name }, {
        $set: {
            Name: req.body.Name,
            Email: req.body.Email,
            Phone: req.body.Phone,
            Textarea: req.body.Textarea
        }
    })
    res.redirect('admin/dashboard');
}

//  * ————————————————————————————————————————————
//  There is the route of search with get method
//  * ————————————————————————————————————————————

let admin_search = async (req, res) => {
    res.render('admin/search', { Search_name: '' });
}

//  * ————————————————————————————————————————————
//  There is the route of search with post method
//  * ————————————————————————————————————————————

let admin_search_post = async (req, res) => {
    let namee = req.body;
    let x = await db.findOne({ Name: namee.Name });
    res.render('admin/search', { Search_name: x });  // Renders the search page with the found result
}

//  * ———————————————————————————————
//  There is the route of delete page 
//  * ———————————————————————————————

let admin_delete = (req, res) => {
    let delete_data = req.params.id;
    db.deleteOne({ Name: delete_data }).then(() => {
        res.render('admin/dashboard')
        console.log('Success')
    }
    )
}


module.exports = {
    home,
    fee,
    gallery,
    anatomy,
    LIBRARY,
    medical,
    research,
    computer,
    apply_get,
    About_get,
    education,
    apply_post,
    admin_edit,
    error_page,
    admin_login,
    hostel_path,
    admin_delete,
    admin_search,
    admin_editing,
    contact_us_get,
    university_path,
    contact_us_post,
    admin_dashboard,
    admin_login_get,
    admin_search_post
}