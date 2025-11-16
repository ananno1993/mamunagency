// Admin Authentication
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

// Simulated Database
const APP_DB = {
    customers: [
        {
            id: 'CUST001',
            name: 'Ayesha Rahman',
            email: 'ayesha@example.com',
            phone: '+880 1712-345678',
            isPremium: true,
            joinDate: '2024-01-15'
        },
        {
            id: 'CUST002',
            name: 'Fatima Khan',
            email: 'fatima@example.com',
            phone: '+880 1798-765432',
            isPremium: false,
            joinDate: '2024-02-20'
        }
    ],
    currentUserStatus: {
        isPremium: false
    },
    heroImages: [
        { id: 1, position: 'Slide 1', url: 'https://randomuser.me/api/portraits/women/1.jpg' },
        { id: 2, position: 'Slide 2', url: 'https://randomuser.me/api/portraits/women/2.jpg' },
        { id: 3, position: 'Slide 3', url: 'https://randomuser.me/api/portraits/women/3.jpg' }
    ],
    modelImages: [
        { id: 1, name: 'Aisha', url: 'https://randomuser.me/api/portraits/women/44.jpg' },
        { id: 2, name: 'Priya', url: 'https://randomuser.me/api/portraits/women/45.jpg' },
        { id: 3, name: 'Sana', url: 'https://randomuser.me/api/portraits/women/46.jpg' },
        { id: 4, name: 'Zara', url: 'https://randomuser.me/api/portraits/women/47.jpg' },
        { id: 5, name: 'Maya', url: 'https://randomuser.me/api/portraits/women/48.jpg' },
        { id: 6, name: 'Laila', url: 'https://randomuser.me/api/portraits/women/49.jpg' }
    ],
    bookingImage: {
        id: 1,
        section: 'Flexible Booking Options',
        url: 'https://randomuser.me/api/portraits/women/4.jpg'
    },
    contactLinks: {
        whatsapp: '8801712345678',
        telegram: 'mamunagency',
        messenger: 'mamunagency'
    },
    serviceLinks: [
        { service: 'Audio Call', whatsapp: 'https://wa.me/8801712345678?text=I want Audio Call service', telegram: 'https://t.me/mamunagency' },
        { service: 'Video Call', whatsapp: 'https://wa.me/8801712345678?text=I want Video Call service', telegram: 'https://t.me/mamunagency' },
        { service: 'InCall', whatsapp: 'https://wa.me/8801712345678?text=I want InCall service', telegram: 'https://t.me/mamunagency' },
        { service: 'OutCall', whatsapp: 'https://wa.me/8801712345678?text=I want OutCall service', telegram: 'https://t.me/mamunagency' }
    ]
};

// Check if user is already logged in
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    const adminUsername = sessionStorage.getItem('adminUsername');
    
    if (isLoggedIn === 'true') {
        showDashboard(adminUsername);
    }
}

// Handle login form submission
document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Store session
        sessionStorage.setItem('adminLoggedIn', 'true');
        sessionStorage.setItem('adminUsername', username);
        
        showDashboard(username);
        showModal('Login Successful', 'Welcome to the admin panel!', 'success');
    } else {
        showModal('Login Failed', 'Invalid username or password. Try: admin/admin123', 'error');
    }
});

// Show dashboard
function showDashboard(username) {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('adminDashboard').classList.remove('hidden');
    document.getElementById('adminUserName').textContent = username;
    
    // Load all data
    updateStats();
    renderCustomersTable();
    renderHeroImages();
    renderModelImages();
    renderBookingImage();
    renderServiceLinks();
    renderPremiumAccess();
    loadContactLinks();
}

// Handle logout
function handleLogout() {
    showModal(
        'Confirm Logout',
        'Are you sure you want to logout?',
        'warning',
        [
            {
                text: 'Cancel',
                class: 'btn-secondary',
                action: () => closeModal()
            },
            {
                text: 'Logout',
                class: 'btn-danger',
                action: () => {
                    sessionStorage.removeItem('adminLoggedIn');
                    sessionStorage.removeItem('adminUsername');
                    location.reload();
                }
            }
        ]
    );
}

// Fetch customers
function fetchCustomers() {
    return APP_DB.customers;
}

// Save customer
function saveCustomer(data, isDelete = false) {
    if (isDelete) {
        APP_DB.customers = APP_DB.customers.filter(c => c.id !== data.id);
    } else {
        const existingIndex = APP_DB.customers.findIndex(c => c.id === data.id);
        if (existingIndex > -1) {
            APP_DB.customers[existingIndex] = { ...APP_DB.customers[existingIndex], ...data };
        } else {
            APP_DB.customers.push(data);
        }
    }
    renderCustomersTable();
}

// Render customers table
function renderCustomersTable() {
    const tbody = document.getElementById('customersTableBody');
    const customers = fetchCustomers();
    
    tbody.innerHTML = customers.map(customer => `
        <tr>
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>
                <span class="status-badge ${customer.isPremium ? 'premium' : 'regular'}">
                    ${customer.isPremium ? '<i class="fas fa-crown"></i> Premium' : '<i class="fas fa-user"></i> Regular'}
                </span>
            </td>
            <td>
                <button class="btn-action btn-edit" onclick='handleEditCustomer("${customer.id}")' style="background: #3498db; color: white; margin-right: 5px;">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn-action btn-toggle-premium" onclick='handleTogglePremium("${customer.id}", ${customer.isPremium})'>
                    <i class="fas fa-${customer.isPremium ? 'arrow-down' : 'arrow-up'}"></i>
                    ${customer.isPremium ? 'Downgrade' : 'Upgrade'}
                </button>
                <button class="btn-action btn-delete" onclick='handleDeleteCustomer("${customer.id}")'>
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        </tr>
    `).join('');
}

// Handle add customer
document.getElementById('addCustomerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const customerData = {
        id: formData.get('customerId'),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        isPremium: formData.get('isPremium') === 'on',
        joinDate: new Date().toISOString().split('T')[0]
    };
    
    // Validation
    const existingCustomer = APP_DB.customers.find(c => c.email === customerData.email || c.id === customerData.id);
    if (existingCustomer) {
        showModal('Duplicate Entry', 'A customer with this email or ID already exists!', 'error');
        return;
    }
    
    saveCustomer(customerData);
    this.reset();
    showModal('Success', `Customer ${customerData.name} added successfully!`, 'success');
});

// Handle toggle premium
function handleTogglePremium(id, currentStatus) {
    const action = currentStatus ? 'downgrade' : 'upgrade';
    const customer = APP_DB.customers.find(c => c.id === id);
    
    showModal(
        `Confirm ${action.charAt(0).toUpperCase() + action.slice(1)}`,
        `Are you sure you want to ${action} ${customer.name} ${currentStatus ? 'to Regular' : 'to Premium'}?`,
        'warning',
        [
            {
                text: 'Cancel',
                class: 'btn-secondary',
                action: () => closeModal()
            },
            {
                text: 'Confirm',
                class: 'btn-primary',
                action: () => {
                    saveCustomer({ id, isPremium: !currentStatus });
                    closeModal();
                    showModal('Success', `${customer.name} has been ${action}d successfully!`, 'success');
                }
            }
        ]
    );
}

// Handle delete customer
function handleDeleteCustomer(id) {
    const customer = APP_DB.customers.find(c => c.id === id);
    
    showModal(
        'Confirm Delete',
        `Are you sure you want to delete ${customer.name}? This action cannot be undone!`,
        'warning',
        [
            {
                text: 'Cancel',
                class: 'btn-secondary',
                action: () => closeModal()
            },
            {
                text: 'Delete',
                class: 'btn-danger',
                action: () => {
                    saveCustomer({ id }, true);
                    closeModal();
                    showModal('Success', `${customer.name} has been deleted successfully!`, 'success');
                }
            }
        ]
    );
}

// Toggle premium status demo
function togglePremiumStatusDemo() {
    APP_DB.currentUserStatus.isPremium = !APP_DB.currentUserStatus.isPremium;
    renderPremiumAccess();
    
    const button = document.getElementById('togglePremiumDemo');
    const icon = button.querySelector('i');
    const text = document.getElementById('togglePremiumText');
    
    if (APP_DB.currentUserStatus.isPremium) {
        icon.className = 'fas fa-toggle-on';
        text.textContent = 'Disable Premium Demo';
        showModal('Premium Enabled', 'You are now viewing as a premium member!', 'success');
    } else {
        icon.className = 'fas fa-toggle-off';
        text.textContent = 'Enable Premium Demo';
        showModal('Premium Disabled', 'You are now viewing as a regular member!', 'info');
    }
    
    // Scroll to premium demo section
    setTimeout(() => {
        document.getElementById('premiumAccessDemo').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
}

// Render premium access
function renderPremiumAccess() {
    const container = document.getElementById('premiumAccessDemo');
    const isPremium = APP_DB.currentUserStatus.isPremium;
    
    if (isPremium) {
        container.innerHTML = `
            <div class="premium-unlocked">
                <div class="premium-icon">
                    <i class="fas fa-crown"></i>
                </div>
                <h3>Welcome, Premium Member!</h3>
                <p>You have access to all exclusive features and services.</p>
                <div class="premium-features">
                    <div class="feature-item">
                        <i class="fas fa-check-circle"></i>
                        <span>Priority Booking</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-check-circle"></i>
                        <span>24/7 VIP Support</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-check-circle"></i>
                        <span>Exclusive Models Access</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-check-circle"></i>
                        <span>Special Discounts</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-check-circle"></i>
                        <span>Private Sessions</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-check-circle"></i>
                        <span>Premium Content</span>
                    </div>
                </div>
            </div>
        `;
    } else {
        container.innerHTML = `
            <div class="premium-locked">
                <div class="lock-icon">
                    <i class="fas fa-lock"></i>
                </div>
                <h3>Premium Features Locked</h3>
                <p>Upgrade to premium to unlock exclusive features and benefits.</p>
                <ul class="locked-features">
                    <li><i class="fas fa-crown"></i> Priority booking with top models</li>
                    <li><i class="fas fa-headset"></i> 24/7 VIP customer support</li>
                    <li><i class="fas fa-star"></i> Access to exclusive premium models</li>
                    <li><i class="fas fa-percent"></i> Special discounts on all services</li>
                    <li><i class="fas fa-user-shield"></i> Private and discreet sessions</li>
                    <li><i class="fas fa-images"></i> Access to premium photo galleries</li>
                </ul>
                <button class="btn-upgrade" onclick="togglePremiumStatusDemo()">
                    <i class="fas fa-crown"></i> Upgrade to Premium (Demo)
                </button>
            </div>
        `;
    }
}

// Modal functions
function showModal(title, message, type = 'info', actions = null) {
    const modal = document.getElementById('customModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const modalFooter = document.getElementById('modalFooter');
    
    modalTitle.innerHTML = `<i class="fas fa-${getModalIcon(type)}"></i> ${title}`;
    modalMessage.textContent = message;
    
    modal.className = 'modal modal-' + type;
    
    if (actions && actions.length > 0) {
        modalFooter.innerHTML = actions.map(action => 
            `<button class="btn ${action.class}" onclick="(${action.action.toString()})()">${action.text}</button>`
        ).join('');
    } else {
        modalFooter.innerHTML = '<button class="btn btn-primary" onclick="closeModal()">OK</button>';
        
        // Auto-close success/info modals after 3 seconds
        if (type === 'success' || type === 'info') {
            setTimeout(() => {
                closeModal();
            }, 3000);
        }
    }
    
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('customModal');
    modal.style.display = 'none';
}

function getModalIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// ============================================
// NAVIGATION & UI FUNCTIONS
// ============================================

// Show section and update navigation
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionName + '-section').classList.add('active');
    
    // Update active nav item
    event.target.closest('.nav-item').classList.add('active');
    
    // Update page title
    const titles = {
        dashboard: 'Dashboard',
        customers: 'Customer Management',
        images: 'Image Manager',
        buttons: 'Button Links',
        settings: 'Settings'
    };
    document.getElementById('pageTitle').textContent = titles[sectionName];
}

// Update dashboard statistics
function updateStats() {
    const totalCustomers = APP_DB.customers.length;
    const premiumCustomers = APP_DB.customers.filter(c => c.isPremium).length;
    const totalImages = APP_DB.heroImages.length + APP_DB.modelImages.length + 1; // +1 for booking image
    const totalLinks = APP_DB.serviceLinks.length + 3; // service links + contact buttons
    
    document.getElementById('totalCustomers').textContent = totalCustomers;
    document.getElementById('premiumCustomers').textContent = premiumCustomers;
    document.getElementById('totalImages').textContent = totalImages;
    document.getElementById('totalLinks').textContent = totalLinks;
}

// ============================================
// IMAGE MANAGEMENT FUNCTIONS
// ============================================

// Render hero images table
function renderHeroImages() {
    const tbody = document.getElementById('heroImagesTable');
    tbody.innerHTML = APP_DB.heroImages.map(img => `
        <tr>
            <td><img src="${img.url}" class="image-preview" alt="${img.position}"></td>
            <td><strong>${img.position}</strong></td>
            <td><input type="text" value="${img.url}" id="hero-url-${img.id}" class="form-control" style="width: 100%; padding: 8px; border: 1px solid #e0e0e0; border-radius: 4px;"></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-action btn-edit" onclick="updateHeroImage(${img.id})">
                        <i class="fas fa-save"></i> Update
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Update hero image
function updateHeroImage(id) {
    const newUrl = document.getElementById(`hero-url-${id}`).value.trim();
    
    if (!newUrl) {
        showModal('Error', 'Image URL cannot be empty!', 'error');
        return;
    }
    
    // Validate URL
    try {
        new URL(newUrl);
    } catch (e) {
        showModal('Error', 'Please enter a valid URL!', 'error');
        return;
    }
    
    const image = APP_DB.heroImages.find(img => img.id === id);
    if (image) {
        image.url = newUrl;
        renderHeroImages();
        updateMainWebsiteImages();
        showModal('Success', `${image.position} image updated successfully!`, 'success');
    }
}

// Render model images table
function renderModelImages() {
    const tbody = document.getElementById('modelImagesTable');
    tbody.innerHTML = APP_DB.modelImages.map(img => `
        <tr>
            <td><img src="${img.url}" class="image-preview" alt="${img.name}"></td>
            <td><strong>${img.name}</strong></td>
            <td><input type="text" value="${img.url}" id="model-url-${img.id}" class="form-control" style="width: 100%; padding: 8px; border: 1px solid #e0e0e0; border-radius: 4px;"></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-action btn-edit" onclick="updateModelImage(${img.id})">
                        <i class="fas fa-save"></i> Update
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Update model image
function updateModelImage(id) {
    const newUrl = document.getElementById(`model-url-${id}`).value.trim();
    
    if (!newUrl) {
        showModal('Error', 'Image URL cannot be empty!', 'error');
        return;
    }
    
    // Validate URL
    try {
        new URL(newUrl);
    } catch (e) {
        showModal('Error', 'Please enter a valid URL!', 'error');
        return;
    }
    
    const image = APP_DB.modelImages.find(img => img.id === id);
    if (image) {
        image.url = newUrl;
        renderModelImages();
        updateMainWebsiteImages();
        showModal('Success', `${image.name}'s image updated successfully!`, 'success');
    }
}

// Render booking image table
function renderBookingImage() {
    const tbody = document.getElementById('bookingImageTable');
    const img = APP_DB.bookingImage;
    tbody.innerHTML = `
        <tr>
            <td><img src="${img.url}" class="image-preview" alt="${img.section}"></td>
            <td><strong>${img.section}</strong></td>
            <td><input type="text" value="${img.url}" id="booking-url" class="form-control" style="width: 100%; padding: 8px; border: 1px solid #e0e0e0; border-radius: 4px;"></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-action btn-edit" onclick="updateBookingImage()">
                        <i class="fas fa-save"></i> Update
                    </button>
                </div>
            </td>
        </tr>
    `;
}

// Update booking image
function updateBookingImage() {
    const newUrl = document.getElementById('booking-url').value.trim();
    
    if (!newUrl) {
        showModal('Error', 'Image URL cannot be empty!', 'error');
        return;
    }
    
    // Validate URL
    try {
        new URL(newUrl);
    } catch (e) {
        showModal('Error', 'Please enter a valid URL!', 'error');
        return;
    }
    
    APP_DB.bookingImage.url = newUrl;
    renderBookingImage();
    updateStats();
    updateMainWebsiteImages();
    showModal('Success', 'Booking Options image updated successfully!', 'success');
}

// Update images on main website (simulation - would need backend integration)
function updateMainWebsiteImages() {
    console.log('Images updated in database. To apply changes to the main website, you would need backend integration.');
    console.log('Hero Images:', APP_DB.heroImages);
    console.log('Model Images:', APP_DB.modelImages);
}

// ============================================
// LINK MANAGEMENT FUNCTIONS
// ============================================

// Load contact links
function loadContactLinks() {
    document.getElementById('whatsappNumber').value = APP_DB.contactLinks.whatsapp;
    document.getElementById('telegramUsername').value = APP_DB.contactLinks.telegram;
    document.getElementById('messengerUsername').value = APP_DB.contactLinks.messenger;
}

// Handle contact links form submission
document.getElementById('contactLinksForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const whatsapp = document.getElementById('whatsappNumber').value.trim();
    const telegram = document.getElementById('telegramUsername').value.trim();
    const messenger = document.getElementById('messengerUsername').value.trim();
    
    if (whatsapp) APP_DB.contactLinks.whatsapp = whatsapp;
    if (telegram) APP_DB.contactLinks.telegram = telegram;
    if (messenger) APP_DB.contactLinks.messenger = messenger;
    
    // Update service links with new WhatsApp number
    if (whatsapp) {
        APP_DB.serviceLinks.forEach(link => {
            link.whatsapp = link.whatsapp.replace(/\d+/, whatsapp);
        });
        renderServiceLinks();
    }
    
    showModal('Success', 'Contact links updated successfully!', 'success');
    console.log('Updated contact links:', APP_DB.contactLinks);
});

// Render service links table
function renderServiceLinks() {
    const tbody = document.getElementById('serviceLinksTable');
    tbody.innerHTML = APP_DB.serviceLinks.map((link, index) => `
        <tr>
            <td><strong>${link.service}</strong></td>
            <td><input type="text" value="${link.whatsapp}" id="service-wa-${index}" class="form-control" style="width: 100%; padding: 8px; border: 1px solid #e0e0e0; border-radius: 4px; font-size: 12px;"></td>
            <td><input type="text" value="${link.telegram}" id="service-tg-${index}" class="form-control" style="width: 100%; padding: 8px; border: 1px solid #e0e0e0; border-radius: 4px; font-size: 12px;"></td>
            <td>
                <button class="btn-action btn-edit" onclick="updateServiceLink(${index})">
                    <i class="fas fa-save"></i> Update
                </button>
            </td>
        </tr>
    `).join('');
}

// Update service link
function updateServiceLink(index) {
    const whatsapp = document.getElementById(`service-wa-${index}`).value.trim();
    const telegram = document.getElementById(`service-tg-${index}`).value.trim();
    
    if (!whatsapp || !telegram) {
        showModal('Error', 'Both WhatsApp and Telegram links are required!', 'error');
        return;
    }
    
    APP_DB.serviceLinks[index].whatsapp = whatsapp;
    APP_DB.serviceLinks[index].telegram = telegram;
    
    showModal('Success', `${APP_DB.serviceLinks[index].service} links updated successfully!`, 'success');
    console.log('Updated service links:', APP_DB.serviceLinks);
}

// ============================================
// DATA MANAGEMENT FUNCTIONS
// ============================================

// Export data as JSON
function exportData() {
    const dataStr = JSON.stringify(APP_DB, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mamun-agency-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showModal('Success', 'Data exported successfully!', 'success');
}

// Reset all data
function resetData() {
    showModal(
        'Confirm Reset',
        'Are you sure you want to reset ALL data? This will delete all customers and restore default settings. This action cannot be undone!',
        'warning',
        [
            {
                text: 'Cancel',
                class: 'btn-secondary',
                action: () => closeModal()
            },
            {
                text: 'Reset Everything',
                class: 'btn-danger',
                action: () => {
                    APP_DB.customers = [];
                    APP_DB.currentUserStatus.isPremium = false;
                    renderCustomersTable();
                    updateStats();
                    renderPremiumAccess();
                    closeModal();
                    showModal('Success', 'All data has been reset!', 'success');
                }
            }
        ]
    );
}

// ============================================
// EDIT CUSTOMER FUNCTIONS
// ============================================

// Handle edit customer
function handleEditCustomer(id) {
    const customer = APP_DB.customers.find(c => c.id === id);
    
    if (!customer) {
        showModal('Error', 'Customer not found!', 'error');
        return;
    }
    
    // Populate form with customer data
    document.getElementById('editCustomerId').value = customer.id;
    document.getElementById('editCustomerName').value = customer.name;
    document.getElementById('editCustomerEmail').value = customer.email;
    document.getElementById('editCustomerPhone').value = customer.phone;
    document.getElementById('editCustomerIdValue').value = customer.id;
    document.getElementById('editIsPremium').checked = customer.isPremium;
    
    // Show edit modal
    document.getElementById('editCustomerModal').style.display = 'flex';
}

// Close edit modal
function closeEditModal() {
    document.getElementById('editCustomerModal').style.display = 'none';
}

// Handle edit customer form submission
document.getElementById('editCustomerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const originalId = document.getElementById('editCustomerId').value;
    const newId = document.getElementById('editCustomerIdValue').value.trim();
    const name = document.getElementById('editCustomerName').value.trim();
    const email = document.getElementById('editCustomerEmail').value.trim();
    const phone = document.getElementById('editCustomerPhone').value.trim();
    const isPremium = document.getElementById('editIsPremium').checked;
    
    // Validation
    if (!newId || !name || !email || !phone) {
        showModal('Error', 'All fields are required!', 'error');
        return;
    }
    
    // Check if new ID conflicts with another customer
    if (newId !== originalId) {
        const existingCustomer = APP_DB.customers.find(c => c.id === newId);
        if (existingCustomer) {
            showModal('Error', 'This Customer ID already exists!', 'error');
            return;
        }
    }
    
    // Check if new email conflicts with another customer
    const existingEmail = APP_DB.customers.find(c => c.email === email && c.id !== originalId);
    if (existingEmail) {
        showModal('Error', 'This email is already in use!', 'error');
        return;
    }
    
    // Find and update customer
    const customerIndex = APP_DB.customers.findIndex(c => c.id === originalId);
    if (customerIndex !== -1) {
        APP_DB.customers[customerIndex] = {
            ...APP_DB.customers[customerIndex],
            id: newId,
            name: name,
            email: email,
            phone: phone,
            isPremium: isPremium
        };
        
        // Re-render table
        renderCustomersTable();
        updateStats();
        
        // Close modal
        closeEditModal();
        
        // Show success message
        showModal('Success', `Customer ${name} updated successfully!`, 'success');
    } else {
        showModal('Error', 'Customer not found!', 'error');
    }
});

// Close edit modal when clicking outside
document.getElementById('editCustomerModal').addEventListener('click', function(e) {
    if (e.target.id === 'editCustomerModal') {
        closeEditModal();
    }
});

// Initialize
checkAuth();
