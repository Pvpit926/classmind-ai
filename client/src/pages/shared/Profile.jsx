import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Badge from '../../components/Badge';
import { HiPencil, HiCheck } from 'react-icons/hi';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { success, error } = useToast();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    college: user?.college || '',
    branch: user?.branch || '',
    year: user?.year || '',
    department: user?.department || '',
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateProfile(formData);
      setEditing(false);
      success('Profile updated successfully!');
    } catch (err) {
      error('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const isStudent = user?.role === 'student';

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="pt-2 lg:pt-0">
        <h1 className="text-2xl lg:text-3xl font-bold text-navy-800 font-display">Profile</h1>
        <p className="text-gray-500 mt-1">Manage your account information.</p>
      </div>

      {/* Avatar & Name */}
      <Card className="text-center">
        <div className="w-20 h-20 rounded-full bg-accent-100 flex items-center justify-center mx-auto mb-4">
          <span className="text-accent-600 font-bold text-2xl font-display">
            {user?.name?.charAt(0) || 'U'}
          </span>
        </div>
        <h2 className="text-xl font-bold text-navy-800 font-display">{user?.name}</h2>
        <p className="text-gray-500 text-sm mt-0.5">{user?.email}</p>
        <Badge variant="primary" className="mt-2">
          {isStudent ? '🎓 Student' : '👩‍🏫 Teacher'}
        </Badge>
      </Card>

      {/* Profile Details */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-navy-800 font-display">Account Details</h2>
          {!editing ? (
            <Button variant="ghost" size="sm" onClick={() => setEditing(true)} icon={HiPencil}>
              Edit Profile
            </Button>
          ) : (
            <Button size="sm" onClick={handleSave} icon={HiCheck} loading={loading}>
              Save Changes
            </Button>
          )}
        </div>

        <div className="space-y-4">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(e) => updateField('name', e.target.value)}
            disabled={!editing}
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            disabled={!editing}
          />
          <Input
            label="College"
            value={formData.college}
            onChange={(e) => updateField('college', e.target.value)}
            disabled={!editing}
          />
          {isStudent ? (
            <>
              <Input
                label="Engineering Branch"
                value={formData.branch}
                onChange={(e) => updateField('branch', e.target.value)}
                disabled={!editing}
              />
              <Input
                label="Year"
                value={formData.year}
                onChange={(e) => updateField('year', e.target.value)}
                disabled={!editing}
              />
            </>
          ) : (
            <Input
              label="Department"
              value={formData.department}
              onChange={(e) => updateField('department', e.target.value)}
              disabled={!editing}
            />
          )}
        </div>
      </Card>

      {/* Account Info */}
      <Card>
        <h2 className="text-lg font-semibold text-navy-800 mb-4 font-display">Account Info</h2>
        <div className="space-y-3">
          <div className="flex justify-between p-3 rounded-xl bg-gray-50">
            <span className="text-sm text-gray-500">Member since</span>
            <span className="text-sm font-medium text-navy-800">{user?.createdAt || 'N/A'}</span>
          </div>
          <div className="flex justify-between p-3 rounded-xl bg-gray-50">
            <span className="text-sm text-gray-500">Role</span>
            <span className="text-sm font-medium text-navy-800 capitalize">{user?.role || 'N/A'}</span>
          </div>
          <div className="flex justify-between p-3 rounded-xl bg-gray-50">
            <span className="text-sm text-gray-500">Account ID</span>
            <span className="text-sm font-medium text-gray-400">{user?.uid || 'N/A'}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
