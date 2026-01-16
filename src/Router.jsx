import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';
import Home from './pages/Home/Home';
import About from './pages/About';
import EventsPage from './pages/Events/EventsPage';
import EventDetail from './pages/Events/EventDetail';
import CreateEvent from './pages/Events/CreateEvent';
import BlogPage from './pages/Blog/BlogPage';
import ArticleDetail from './pages/Blog/ArticleDetail';
import CreateArticle from './pages/Blog/CreateArticle';
import DonationPage from './pages/Donations/DonationPage';
import MembershipForm from './pages/Membership/MembershipForm';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import NotFound from './pages/NotFound';
import ForumPage from './pages/Forum/ForumPage';
import TopicDetail from './pages/Forum/TopicDetail';
import Dashboard from './components/user/Dashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import UserManagement from './components/admin/UserManagement';
import EventManagement from './components/admin/EventManagement';
import BlogManagement from './components/admin/BlogManagement';
import DonationManagement from './components/admin/DonationManagement';
import AdminSettings from './components/admin/AdminSettings';
import ForumManagement from './components/admin/ForumManagement';

const Layout = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

 const HomeLayout = ({ children }) => (
   <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
     <main className="flex-1">{children}</main>
     <Footer />
   </div>
 );

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes sans Layout (pages d'authentification) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Routes avec Layout */}
        <Route path="/" element={<HomeLayout><Home /></HomeLayout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/events" element={<Layout><EventsPage /></Layout>} />
        <Route path="/events/create" element={
          <Layout>
            <ProtectedRoute>
              <CreateEvent />
            </ProtectedRoute>
          </Layout>
        } />
        <Route path="/events/:id" element={<Layout><EventDetail /></Layout>} />
        <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
        <Route path="/blog/create" element={
          <Layout>
            <ProtectedRoute>
              <CreateArticle />
            </ProtectedRoute>
          </Layout>
        } />
        <Route path="/blog/:id" element={<Layout><ArticleDetail /></Layout>} />
        <Route path="/donations" element={<Layout><DonationPage /></Layout>} />
        <Route path="/membership" element={<Layout><MembershipForm /></Layout>} />
        <Route path="/forum" element={<Layout><ForumPage /></Layout>} />
        <Route path="/forum/:id" element={<Layout><TopicDetail /></Layout>} />

        <Route
          path="/dashboard"
          element={
            <Layout>
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/admin/users"
          element={
            <Layout>
              <AdminRoute>
                <UserManagement />
              </AdminRoute>
            </Layout>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <Layout>
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            </Layout>
          }
        />
        <Route
          path="/admin/events"
          element={
            <Layout>
              <AdminRoute>
                <EventManagement />
              </AdminRoute>
            </Layout>
          }
        />
        <Route
          path="/admin/blog"
          element={
            <Layout>
              <AdminRoute>
                <BlogManagement />
              </AdminRoute>
            </Layout>
          }
        />
        <Route
          path="/admin/forum"
          element={
            <Layout>
              <AdminRoute>
                <ForumManagement />
              </AdminRoute>
            </Layout>
          }
        />
        <Route
          path="/admin/donations"
          element={
            <Layout>
              <AdminRoute>
                <DonationManagement />
              </AdminRoute>
            </Layout>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <Layout>
              <AdminRoute>
                <AdminSettings />
              </AdminRoute>
            </Layout>
          }
        />


        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;