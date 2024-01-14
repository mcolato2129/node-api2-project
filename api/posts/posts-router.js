// implement your posts router here
const express = require('express');
const Posts = require('./posts-model');

const router = express.Router();

router.use(express.json())

router.get('/api/posts', (req, res) => {
    Posts.find(req.query)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({ message: "The posts information could not be retrieved" });
        })
})

router.get('/api/posts/:id', (req, res) => {
    const { id } = req.params
    Posts.findById(id)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist" });
            }
        }).catch(err => {
            res.status(500).json({ message: "The post information could not be retrieved" });
        })
})

router.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;

    if (!title || !contents) {
        res.status(400).json({ message: "Please provide title and contents for the post" });
    } else {
        Posts.insert({ title, contents })
            .then(({ id }) => {
                return Posts.findById(id);
            }).then(newPost => {
                res.status(201).json(newPost);
            })
            .catch(err => {
                res.status(500).json({ message: "There was an error while saving the post to the database" })
            })
    }
})

router.put('/api/posts/:id', (req, res) => {
    const { id } = req.params
    const { title, contents } = req.body;

    if (!id) {
        res.status(404).json({ message: "The post with the specified ID does not exist" })
    } else {
        if (!title || !contents) {
            res.status(400).json({ message: "Please provide title and contents for the post" })
        } else {
            Posts.update(id, req.body).then(updatedPost => {
                res.status(200).json(updatedPost);
            }).catch(err => {
                res.status(500).json({message: "The post information could not be modified"});
            })     
        }

    }
})



router.delete('/api/posts/:id', async (req, res) => {
   try {
    const deletedPost = await Posts.remove(req.params.id)

    if(!post){
        res.status(404).json({ message: "The post with the specified ID does not exist" });
    }


   } catch(err) {
    res.status(500).json({ message: "The post could not be removed" })
   }
        
    
})

 
    


module.exports = router