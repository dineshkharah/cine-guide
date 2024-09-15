import axios from 'axios';
import { Button, Modal, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const navigate = useNavigate();

    // States for profile data and modals
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState(null);
    const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
    const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

    // Password state
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    // Fetch Profile Data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/api/v1/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfileData(response.data.user);
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setError('Could not load profile data');
            }
        };
        fetchProfile();
    }, []);

    // Handle Update Password
    const handleUpdatePassword = async () => {
        if (newPassword === oldPassword) {
            message.error('New password cannot be the same as the old password');
            return;
        }
        if (newPassword !== confirmNewPassword) {
            message.error('Passwords do not match!');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.put('/api/v1/auth/password', {
                oldPassword,
                newPassword,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            message.success('Password updated successfully');
            setPasswordModalVisible(false);
        } catch (error) {
            message.error('Error updating password');
            console.error(error);
        }
    };

    // Handle Delete Profile
    const handleDeleteProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete('/api/v1/auth/account', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            message.success('Profile deleted successfully');
            setDeleteModalVisible(false);
        } catch (error) {
            message.error('Could not delete profile');
            console.error('Error deleting profile:', error);
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="profile-container">
            {profileData ? (
                <div className="profile-card">
                    <div className="profile-picture"></div>

                    <div className="profile-info">
                        <h1 className="profile-username">{profileData.username}</h1>
                        <p className="profile-email">Email: {profileData.email}</p>
                        <p className="profile-bio">Bio: {profileData.bio || 'None'}</p>
                        <p className="profile-genres">
                            Favorite Genres: {profileData.favoriteGenres.length > 0
                                ? profileData.favoriteGenres.join(', ')
                                : 'None'}
                        </p>

                        {/* Buttons */}
                        <div className="profile-actions">
                            <Button
                                type="primary"
                                className="action-button"
                                onClick={() => setConfirmModalVisible(true)}
                            >
                                Change Password
                            </Button>
                            <Button
                                type="danger"
                                className="action-button"
                                onClick={() => setDeleteModalVisible(true)}
                            >
                                Delete Profile
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="loading-message">Loading...</p>
            )}

            {/* Confirm Password Change Modal */}
            <Modal
                title="Confirm Password Change"
                visible={isConfirmModalVisible}
                onOk={() => {
                    setPasswordModalVisible(true);
                    setConfirmModalVisible(false);
                }}
                onCancel={() => setConfirmModalVisible(false)}
                okText="Confirm"
                cancelText="Cancel"
            >
                <p>Are you sure you want to change your password</p>
            </Modal>

            {/* Update Password Modal */}
            <Modal
                title="Update Password"
                visible={isPasswordModalVisible}
                onOk={handleUpdatePassword}
                onCancel={() => setPasswordModalVisible(false)}
                okText="Update"
                cancelText="Cancel"
            >
                <Input.Password
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
                <Input.Password
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{ marginTop: 10 }}
                />
                <Input.Password
                    placeholder="Confirm New Password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    style={{ marginTop: 10 }}
                />
            </Modal>

            {/* Delete Profile Modal */}
            <Modal
                title="Delete Profile"
                visible={isDeleteModalVisible}
                onOk={handleDeleteProfile}
                onCancel={() => setDeleteModalVisible(false)}
                okText="Delete"
                cancelText="Cancel"
            >
                <p>Are you sure you want to delete your profile?</p>
            </Modal>


        </div>
    );
};

export default ProfilePage;