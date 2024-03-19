<p class="d-inline-flex gap-1">
    <button onclick="fetchCategories()" class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
        Add a new task
    </button>
</p>
<div class="collapse" id="collapseExample">
    <div class="card card-body">
        <h5 class="card-title">New task</h5>
        <div class="mb-3">
            <label for="taskTitle" class="form-label">Task title</label>
            <input type="text" class="form-control" id="taskTitle" placeholder="Task title here..." data-bs-theme="light">
        </div>
        <div class="mb-3">
            <label for="taskDescription" class="form-label">Description</label>
            <input type="text" class="form-control" id="taskDescription" placeholder="Task description here..." data-bs-theme="light">
        </div>
        <div class="d-flex flex-row flex-wrap">
            <div class="mb-3">
                <label for="taskDueDate" class="form-label">Due date</label>
                <input type="date" class="form-control" id="taskDueDate" data-bs-theme="dark">
            </div>
            <div class="mb-3">
                <label for="taskPriority" class="form-label">Priority</label>
                <select class="form-control" id="taskPriority" data-bs-theme="dark">
                    <option>Normal</option>
                    <option>Important</option>
                    <option>Urgent</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="taskCategory" class="form-label">Categories</label>
                <div class="mb-3 card-group flex-row flex-wrap" id="taskCategory">
                    <!-- Here will be dynamically added categories -->
                </div>
            </div>
        </div>
        <button type="button" class="btn btn-success" onclick="addTask()">Add task</button>
    </div>
</div>