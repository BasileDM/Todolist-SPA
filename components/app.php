<div class="toolbar-button-container">
    <?php
    include __DIR__ . '/new-task-form.php';
    ?>
</div>
<div class="list-container">
    <?php
    include __DIR__ . '/task-list.php';
    ?>
</div>
<div class="modal fade" id="task-details-modal" tabindex="-1" aria-labelledby="taskDetailsLabel" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="taskDetailsLabel">Task details</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p class="mb-0" id="task-modal-priority">Priority : </p>
                <p class="mb-0" id="task-modal-dueDate">Due Date : </p>
                <p class="mb-0" id="task-modal-categories">Categories : </p>
                <p class="mb-0" id="task-modal-description">Description : </p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>
</div>
