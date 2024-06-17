const blogs = require('../schema/BlogSchema')

const blog_index = (req, res) => {
    blogs.find().sort({ createdAt:-1 })
        .then((result) => {
        res.render('blogs/index', { title: 'All Blogs', Blogs: result})
    }).catch((err) => {
        console.log(err);
    })
}

const blog_details = (req, res) => {
    const id = req.params.id;
    blogs.findById(id)
    .then(result => {
        res.render('blogs/details', { blog: result, title: 'Blog Details'});
    })
    .catch(err => {
        console.log(err);
        res.status(404).render('404', { title: 'Blog not found' })
    });
}

const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'Create Blog'});
}

const blog_create_post = (req, res) => {
    const blog = new blogs(req.body);

    blog.save().then((result) => {
        res.redirect('/Blogs')
    }).catch((err) => {
        console.log(err)
    });
}

const blog_delete = (req, res) => {
    const id = req.params.id;

    blogs.findByIdAndDelete(id)
    .then(result => {
        res.json({ redirect: '/Blogs' });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    });
}

const blog_edit_get = (req, res) => {
    const id = req.params.id;
    blogs.findById(id) // opens the schema and looks for the id of the blog
        .then(result => { 
            res.render('blogs/edit', { post: result, title: 'Edit Blog' }); // if successful it opens the edits.ejs 
        })
        .catch(err => {
            console.log(err);
            res.status(404).render('404', { title: 'Blog not found' })
        });
};


const blog_edit_post = (req, res) => {
    const id = req.params.id; // extracts the user id parameter from the request URL
    const { title, snippet, body } = req.body; // extracts the title and content of the body
    
    blogs.findByIdAndUpdate(id, { title, snippet, body }, { new: true }) // looks for the document through the document's id and updates it with the new content and title
        .then(result => {
            res.redirect(`/blogs/${id}`); // saves the updated files to the database
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
}

module.exports = { 
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
    blog_edit_get,
    blog_edit_post
}