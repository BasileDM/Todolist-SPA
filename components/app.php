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
<!-- Add task modal -->
<div class="modal fade" id="task-details-modal" tabindex="-1" aria-labelledby="taskDetailsLabel" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <img id="edit-title" src="./../assets/imgs/edit.svg" alt="Edit icon" width="20px" height="20px" class="d-inline me-2" style="cursor: pointer;">
                <h1 class="modal-title fs-5" id="taskDetailsLabel">Task details</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="list-group list-group-flush" id="task-modal-details-ctn">
                    <div class="list-group-item" id="task-modal-priority-ctn">
                        <img id="edit-priority" src="./../assets/imgs/edit.svg" alt="Edit icon" width="20px" height="20px" class="d-inline" style="cursor: pointer;">
                        <p id="task-modal-priority" class="d-inline">Priority : </p>
                    </div>
                    <div class="list-group-item">
                        <img id="edit-dueDate" src="./../assets/imgs/edit.svg" alt="Edit icon" width="20px" height="20px" class="d-inline" style="cursor: pointer;">
                        <p id="task-modal-dueDate" class="d-inline">Due Date : </p>
                    </div>
                    <div class="list-group-item">
                        <img id="edit-categories" src="./../assets/imgs/edit.svg" alt="Edit icon" width="20px" height="20px" class="d-inline" style="cursor: pointer;">
                        <p id="task-modal-categories" class="d-inline">Categories : </p>
                    </div>
                    <div class="list-group-item">
                        <img id="edit-description" src="./../assets/imgs/edit.svg" alt="Edit icon" width="20px" height="20px" class="d-inline" style="cursor: pointer;">
                        <p id="task-modal-description" class="d-inline">Description : </p>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="save-changes-btn">Save changes</button>
            </div>
        </div>
    </div>
</div>

<!-- Delete Task Modal -->