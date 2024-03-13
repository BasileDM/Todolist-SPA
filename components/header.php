<header>
    <nav class="navbar navbar-expand-lg bg-primary">
        <div class="container-fluid">
            <img src="../assets/imgs/logo.svg" alt="Logo" width="60" height="48">
            <a class="navbar-brand" href="#">
                <h2>TodoList</h2>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <?php
                    if (isset($_SESSION['connected']) && $_SESSION['connected'] == true) {
                ?>
                    <button type="button" class="btn btn-secondary m-1 ms-auto" data-bs-toggle="modal" data-bs-target="#settings-modal"">Settings</button>
                    <button type="button" class="btn btn-danger m-1">Log out</button>
                <?php } else { ?>
                    <button type="button" class="btn btn-success m-1 ms-auto" data-bs-toggle="modal" data-bs-target="#login-modal">Log in</button>
                <?php } ?>
            </div>
        </div>
    </nav>
</header>