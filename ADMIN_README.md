# Mamun Agency - Professional Admin Panel

## Admin Access

To access the admin panel:

1. Click the **Admin** link in the navigation menu (highlighted in purple)
2. You will be redirected to the login page
3. Use the following credentials:

**Username:** `admin`  
**Password:** `admin123`

## 🎨 New Professional Features

### 📊 Dashboard
- **Real-time Statistics**: View total customers, premium members, images, and active links
- **Quick Overview**: Summary of all management sections
- **Professional Design**: Modern sidebar navigation with gradient theme

### 👥 Customer Management
- **Add New Customers**: Comprehensive form with validation
- **Customer List**: Sortable table with all customer information
- **Premium Toggle**: Easily upgrade/downgrade customer status
- **Delete Customers**: Remove customers with confirmation dialog

### 🖼️ Image Manager (NEW!)
**Hero Slider Images**:
- Manage all 3 hero section slider images
- Live preview of current images
- Update image URLs instantly
- Validation for proper URL format

**Model Gallery Images**:
- Manage 6 model profile images
- Edit each model's photo individually
- Preview before updating
- Named model tracking (Aisha, Priya, Sana, Zara, Maya, Laila)

### 🔗 Button Links Manager (NEW!)
**Contact Links**:
- WhatsApp number (with country code format)
- Telegram username
- Facebook Messenger username
- Auto-updates all service links

**Service Contact Links**:
- Individual WhatsApp links for each service (Audio Call, Video Call, InCall, OutCall)
- Custom Telegram links per service
- Pre-filled message templates
- Quick edit and update functionality

### ⚙️ Settings
- **Premium Demo**: Toggle to preview premium vs regular user experience
- **Export Data**: Download all data as JSON file
- **Reset Database**: Clear all customer data (with confirmation)

## 🎨 Design Improvements

### Professional UI Elements:
- ✅ **Sidebar Navigation**: Fixed left sidebar with gradient background
- ✅ **Modern Color Scheme**: Dark sidebar with white content area
- ✅ **Stat Cards**: Animated cards with icons and hover effects
- ✅ **Table Design**: Clean, modern tables with hover states
- ✅ **Form Styling**: Enhanced form inputs with focus states
- ✅ **Responsive Layout**: Works perfectly on all devices
- ✅ **Action Buttons**: Color-coded buttons (edit=blue, delete=red, save=gradient)
- ✅ **Image Previews**: 80x80px thumbnails in tables

### Navigation Sections:
1. **Dashboard** - Overview and statistics
2. **Customers** - Customer management
3. **Image Manager** - Update website images
4. **Button Links** - Edit contact and service links
5. **Settings** - System configuration

## 📝 How to Use Each Feature

### Updating Images:
1. Navigate to **Image Manager** from sidebar
2. Choose Hero Slider or Model Gallery section
3. Enter new image URL in the input field
4. Click **Update** button
5. Image preview updates automatically

### Editing Button Links:
1. Go to **Button Links** section
2. For contact links: Enter WhatsApp number (e.g., 8801712345678), Telegram username, Messenger username
3. Click **Save Contact Links**
4. For service links: Edit individual WhatsApp/Telegram URLs for each service
5. Click **Update** on the specific service

### Managing Customers:
1. Navigate to **Customers** section
2. Fill in customer form (Name, Email, Phone, ID)
3. Check "Premium Member" if applicable
4. Click **Add Customer**
5. Use table actions to toggle premium status or delete

### Exporting Data:
1. Go to **Settings** section
2. Click **Export Data (JSON)**
3. File downloads automatically with date stamp
4. Use for backups or migration

## 🔒 Security Notes

⚠️ **Important**: This is a demo implementation with frontend-only storage.

For production use, implement:
- Backend API with secure authentication
- Database persistence (MySQL, MongoDB, PostgreSQL)
- JWT or session-based auth with refresh tokens
- HTTPS/SSL encryption
- Rate limiting and CSRF protection
- Image upload with validation and storage
- CDN for image hosting
- Environment variables for sensitive data

## 💾 Data Persistence

**Current State**: 
- Data stored in `APP_DB` object (in-memory)
- Changes lost on page refresh
- Suitable for demo/testing only

**Production Requirements**:
- REST API endpoints for CRUD operations
- Database tables: customers, images, settings, links
- File storage for images (AWS S3, Cloudinary, etc.)
- Backup and recovery systems

## 📱 Responsive Design

The admin panel is fully responsive:
- **Desktop**: Full sidebar + main content
- **Tablet**: Collapsible sidebar
- **Mobile**: Hamburger menu navigation

## 🎯 Key Features Summary

| Feature | Status | Description |
|---------|--------|-------------|
| Customer CRUD | ✅ Complete | Add, edit, delete customers |
| Premium Toggle | ✅ Complete | Upgrade/downgrade membership |
| Image Management | ✅ Complete | Update hero & model images |
| Link Editor | ✅ Complete | Edit all contact links |
| Statistics | ✅ Complete | Real-time dashboard stats |
| Data Export | ✅ Complete | JSON export functionality |
| Professional UI | ✅ Complete | Modern sidebar design |
| Responsive | ✅ Complete | Mobile-friendly layout |

## 🆘 Support

For questions or issues, contact the development team.

---

**Version**: 2.0  
**Last Updated**: November 16, 2025  
**All changes are demo-only and require backend integration for production use**

