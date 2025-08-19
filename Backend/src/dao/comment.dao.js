export async function createCommentController(req, res) {
    const { post, text } = req.body
    const user = req.user

    const comment = await createComment({
        user: user._id,
        post,
        text
    })

    return res.status(201).json({
        message: "Comment created successfully",
        comment
    })
}