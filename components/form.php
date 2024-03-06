<p class="d-inline-flex gap-1">
    <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
        Add a new task
    </button>
</p>
<div class="collapse" id="collapseExample">
    <div class="card card-body">
        <h5 class="card-title">Add a new task</h5>
        <div class="mb-3">
            <label for="taskTitle" class="form-label">Task title</label>
            <input type="text" class="form-control" id="taskTitle" placeholder="Task title here...">
        </div>
        <div class="mb-3">
            <label for="taskDescription" class="form-label">Task description</label>
            <input type="text" class="form-control" id="taskDescription" placeholder="Task description here...">
        </div>
        <div class="mb-3">
            <label for="taskDueDate" class="form-label">Task due date</label>
            <input type="date" class="form-control" id="taskDueDate">
        </div>
        <div class="mb-3">
            <label for="taskPriority" class="form-label">Task priority</label>
            <select class="form-control" id="taskPriority">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
            </select>
        </div>
        <button type="submit" class="btn btn-success">Add task</button>
    </div>
</div>