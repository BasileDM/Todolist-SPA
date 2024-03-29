<div class="m-2">
    <?php
    include __DIR__ . '/new-task-form.html';
    ?>
</div>
<div class="m-2">
    <?php
    include __DIR__ . '/task-list.html';
    ?>
</div>
<!-- Edit task modal -->
<div class="modal fade" id="task-details-modal" tabindex="-1" aria-labelledby="taskDetailsLabel" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <span data-bs-toggle="tooltip" data-bs-title="Edit title">
                    <img id="edit-title" src="./../assets/imgs/edit.svg" alt="Edit icon" width="20px" height="20px" class="d-inline me-2" style="cursor: pointer;">
                </span>
                <h1 class="modal-title fs-5" id="taskDetailsLabel">Task details</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="list-group list-group-flush" id="task-modal-details-ctn">
                    <div class="list-group-item" id="task-modal-priority-ctn">
                        <span data-bs-toggle="tooltip" data-bs-title="Edit priority">
                            <img id="edit-priority" src="./../assets/imgs/edit.svg" alt="Edit icon" width="20px" height="20px" class="d-inline" style="cursor: pointer;">
                        </span>
                        <p id="task-modal-priority" class="d-inline">Priority : </p>
                    </div>
                    <div class="list-group-item">
                        <span  data-bs-toggle="tooltip" data-bs-title="Edit due date">
                            <img id="edit-dueDate" src="./../assets/imgs/edit.svg" alt="Edit icon" width="20px" height="20px" class="d-inline" style="cursor: pointer;">
                        </span>
                        <p id="task-modal-dueDate" class="d-inline">Due Date : </p>
                    </div>
                    <div class="list-group-item">
                        <span data-bs-toggle="tooltip" data-bs-title="Edit categories">
                            <img id="edit-categories" src="./../assets/imgs/edit.svg" alt="Edit icon" width="20px" height="20px" class="d-inline" style="cursor:pointer;">
                        </span>
                        <p id="task-modal-categories" class="d-inline">Categories : </p>
                    </div>
                    <div class="list-group-item">
                        <span data-bs-toggle="tooltip" data-bs-title="Edit description">
                            <img id="edit-description" src="./../assets/imgs/edit.svg" alt="Edit icon" width="20px" height="20px" class="d-inline" style="cursor: pointer;">
                        </span>
                        <p id="task-modal-description" class="d-inline">Description : </p>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="close-task-details-modal">Close</button>
                <button type="button" class="btn btn-primary" id="save-changes-btn">Save changes</button>
            </div>
        </div>
    </div>
</div>

<!-- Account settings modal -->
<div class="modal fade" id="settings-modal" tabindex="-1" aria-labelledby="settingsModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="settingsModalLabel">Account settings</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="close-settings-modal-cross"></button>
            </div>
            <div class="modal-body">
                <div class="list-group list-group-flush" id="task-modal-details-ctn">
                    <div class="list-group-item" id="task-modal-priority-ctn">
                        <span data-bs-toggle="tooltip" data-bs-title="Edit last name">
                            <img id="edit-last-name" src="./../assets/imgs/edit.svg" alt="Edit icon" width="20px" height="20px" class="d-inline" style="cursor: pointer;">
                        </span>
                        <p id="settings-modal-last-name" class="d-inline">Last name : </p>
                    </div>
                    <div class="list-group-item">
                        <span data-bs-toggle="tooltip" data-bs-title="Edit first name">
                            <img id="edit-first-name" src="./../assets/imgs/edit.svg" alt="Edit icon" width="20px" height="20px" class="d-inline" style="cursor: pointer;">
                        </span>
                        <p id="settings-modal-first-name" class="d-inline">First name : </p>
                    </div>
                    <div class="list-group-item">
                        <span data-bs-toggle="tooltip" data-bs-title="Edit mail">
                            <img id="edit-mail" src="./../assets/imgs/edit.svg" alt="Edit icon" width="20px" height="20px" class="d-inline" style="cursor: pointer;">
                        </span>
                        <p id="settings-modal-mail" class="d-inline">Mail : </p>
                    </div>
                    <div class="list-group-item">
                        <span data-bs-toggle="tooltip" data-bs-title="Modify your password">
                            <img id="edit-password" src="./../assets/imgs/edit.svg" alt="Edit icon" width="20px" height="20px" class="d-inline" style="cursor: pointer;">
                        </span>
                        <p id="settings-modal-password" class="d-inline">Change password</p>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button id="delete-account" type="button" class="btn btn-danger me-auto" data-bs-toggle="modal" data-bs-target="#delete-account-confirm-modal">Delete account</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="close-settings-modal">Close</button>
                <button id="save-account-changes" type="button" class="btn btn-success">Save changes</button>
            </div>
        </div>
    </div>
</div>

<!-- delete account confirmation modal -->
<div class="modal fade" id="delete-account-confirm-modal" tabindex="-1" aria-labelledby="deleteAccountModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="deleteAccountModalLabel">Delete this account ?</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                Are you sure you want to delete this account ? This is irreversible !
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                <button type="button" class="btn btn-danger" id="delete-account-confirm-btn" data-bs-dismiss="modal">Yes</button>
            </div>
        </div>
    </div>
</div>
