
    // Function to handle file upload
    function handleFileUpload(event) {
      event.preventDefault(); // Prevent default form submission

      const fileInput = document.getElementById('fileInput');
      const fileList = document.getElementById('fileList');

      const files = fileInput.files;

      // Store files in local cache (localStorage)
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        localStorage.setItem(`file_${i}`, JSON.stringify({
          name: file.name,
          size: file.size,
          lastModified: file.lastModified
        }));
      }

      // Clear previous file list
      fileList.innerHTML = '';

      // Display files from local cache
      displayFiles();
    }

    // Function to display files from local cache
    function displayFiles() {
      const fileList = document.getElementById('fileList');
      fileList.innerHTML = '';

      // Retrieve files from local cache
      const files = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('file_')) {
          files.push(JSON.parse(localStorage.getItem(key)));
        }
      }

      // Sort files based on current sort option
      const sortNameBtn = document.getElementById('sortNameBtn');
      const sortSizeBtn = document.getElementById('sortSizeBtn');
      const sortTimeBtn = document.getElementById('sortTimeBtn');

      if (sortNameBtn.classList.contains('active')) {
        files.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortSizeBtn.classList.contains('active')) {
        files.sort((a, b) => a.size - b.size);
      } else if (sortTimeBtn.classList.contains('active')) {
        files.sort((a, b) => a.lastModified - b.lastModified);
      }

      // Display sorted file list
      files.forEach((file) => {
        const li = document.createElement('li');
        li.textContent = file.name;
        fileList.appendChild(li);
      });
    }

    // Function to handle sort option selection
    function handleSortOption(event) {
      event.preventDefault();

      const sortNameBtn = document.getElementById('sortNameBtn');
      const sortSizeBtn = document.getElementById('sortSizeBtn');
      const sortTimeBtn = document.getElementById('sortTimeBtn');

      // Remove active class from all sort buttons
      sortNameBtn.classList.remove('active');
      sortSizeBtn.classList.remove('active');
      sortTimeBtn.classList.remove('active');

      // Add active class to the selected sort button
      event.target.classList.add('active');

      // Display files based on the selected sort option
      displayFiles();
    }

    // Attach event listeners
    const uploadForm = document.getElementById('uploadForm');
    uploadForm.addEventListener('submit', handleFileUpload);

    const sortNameBtn = document.getElementById('sortNameBtn');
    const sortSizeBtn = document.getElementById('sortSizeBtn');
    const sortTimeBtn = document.getElementById('sortTimeBtn');

    sortNameBtn.addEventListener('click', handleSortOption);
    sortSizeBtn.addEventListener('click', handleSortOption);
    sortTimeBtn.addEventListener('click', handleSortOption);

    // Set initial sort option to sort by name
    sortNameBtn.classList.add('active');

    // Display files on page load
    displayFiles();
