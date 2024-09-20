import axios from 'axios';
import { Button, Modal, Input, message, Tag } from 'antd';
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
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [editingField, setEditingField] = useState('');
    const [isSaveProfileVisible, setSaveProfileVisible] = useState(false);

    // Editing data states
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [genres, setGenres] = useState([]);
    const [newGenre, setNewGenre] = useState('');

    // Password state
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    // States to hold the initial data
    const [initialEmail, setInitialEmail] = useState('');
    const [initialBio, setInitialBio] = useState('');
    const [initialGenres, setInitialGenres] = useState([]);

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
                const { email, bio, favoriteGenres } = response.data.user;

                // Set profile data states
                setProfileData(response.data.user);
                setEmail(email || '');
                setBio(bio || '');
                setGenres(favoriteGenres || []);

                // Set initial data states
                setInitialEmail(email || '');
                setInitialBio(bio || '');
                setInitialGenres(favoriteGenres || []);
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setError('Could not load profile data');
            }
        };
        fetchProfile();
    }, []);

    // Handle field edit
    const handleFieldEdit = (field) => {
        setEditingField(field);
        setEditModalVisible(true);
    }

    // Check if profile data has changed
    const checkChanges = () => {
        if (email !== initialEmail || bio !== initialBio || JSON.stringify(genres) !== JSON.stringify(initialGenres)) {
            setSaveProfileVisible(true);

        } else {
            setSaveProfileVisible(false);
        }
    }

    // Adding a new genre
    const handleAddGenre = () => {
        if (newGenre && genres.length < 5) {
            setGenres([...genres, newGenre]);
            setNewGenre('');
            checkChanges();
        }
    };

    // Removing a genre
    const handleRemoveGenre = (genre) => {
        const updatedGenres = genres.filter((g) => g !== genre);
        setGenres(updatedGenres);
        checkChanges();
    }



    // Handle Update Profile
    const handleUpdateProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put('/api/v1/auth/profile', {
                email,
                bio,
                favoriteGenres: genres,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            message.success('Profile updated successfully');

            // Update initial data states
            setInitialEmail(email);
            setInitialBio(bio);
            setInitialGenres(genres);
            setSaveProfileVisible(false);
        } catch (error) {
            message.error('Error updating profile');
            console.error('Error updating profile:', error);
        }
    }

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
            navigate('/');
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

                        <p className="profile-email">
                            Email: {email || 'None'}
                            <Button type="link" onClick={() => handleFieldEdit('email')}>Edit</Button>
                        </p>

                        <p className="profile-bio" style={{ "word-wrap": "break-word", maxWidth: "34rem" }}>
                            Bio: {bio || 'None'}
                            <Button type="link" onClick={() => handleFieldEdit('bio')}>Edit</Button>
                        </p>

                        <p className="profile-genres">
                            Favorite Genres:
                            <div style={{ marginTop: 10, maxWidth: "34rem" }}>
                                {genres.map((genre) => (
                                    <Tag
                                        key={genre}
                                        closable
                                        onClose={() => handleRemoveGenre(genre)}
                                        className="profile-genre--tag"
                                    >
                                        {genre}
                                    </Tag>
                                ))}
                                {genres.length < 5 && (
                                    <div style={{ display: 'flex', gap: '8px', marginTop: '10px', maxWidth: "34rem" }}>
                                        <Input
                                            value={newGenre}
                                            onChange={(e) => setNewGenre(e.target.value)}
                                            onPressEnter={handleAddGenre}
                                            placeholder="Add genre"
                                            style={{ marginTop: 10, maxWidth: "34rem" }}
                                        />
                                        <Button
                                            type="primary"
                                            onClick={handleAddGenre}
                                            style={{ marginTop: 10, maxWidth: "7.5rem" }}
                                        >
                                            Add
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </p>



                        {/* Buttons */}
                        <div className="profile-actions">
                            <Button
                                type="primary"
                                className="action-button"
                                onClick={handleUpdateProfile}
                            >
                                Save Profile
                            </Button>
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

            {/* Edit Modal */}
            <Modal
                title={`Edit ${editingField}`}
                visible={isEditModalVisible}
                onCancel={() => setEditModalVisible(false)}
                footer={(
                    <div style={{ display: 'flex', flexWrap: "wrap", justifyContent: 'flex-end', gap: '0.625rem', marginTop: "1.25rem" }}>
                        <Button
                            onClick={() => setEditModalVisible(false)}
                            style={{ width: '6.25rem', height: '2.5rem' }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="primary"
                            onClick={() => {
                                if (editingField === 'email') {
                                }
                                setEditModalVisible(false);
                                checkChanges();
                            }}
                            style={{ width: '6.25rem', height: '2.5rem' }}
                        >
                            Save
                        </Button>
                    </div>
                )}
            >
                {editingField === 'email' && (
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter new email"
                    />
                )}
                {editingField === 'bio' && (
                    <Input.TextArea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Enter new bio"
                    />
                )}
            </Modal>


            {/* Confirm Password Change Modal */}
            <Modal
                title="Confirm Password Change"
                visible={isConfirmModalVisible}
                maskClosable={true} // closing modal on clicking outside
                closable={true} // X button to close the modal
                onCancel={() => setConfirmModalVisible(false)}
                centered
                footer={(
                    <div style={{ display: 'flex', flexWrap: "wrap", justifyContent: 'flex-end', gap: '0.625rem', marginTop: "1.25rem" }}>
                        <Button
                            onClick={() => setConfirmModalVisible(false)}
                            style={{ width: '6.25rem', height: '2.5rem' }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="primary"
                            onClick={() => {
                                setPasswordModalVisible(true);
                                setConfirmModalVisible(false);
                            }}
                            style={{ width: '6.25rem', height: '2.5rem' }}

                        >
                            Confirm
                        </Button>
                    </div>
                )}
            >
                <p>Are you sure you want to change your password?</p>
            </Modal>

            {/* Update Password Modal */}
            <Modal
                title="Update Password"
                visible={isPasswordModalVisible}
                maskClosable={true}
                closable={true}
                onCancel={() => setPasswordModalVisible(false)}
                centered
                footer={(
                    <div style={{ display: 'flex', flexWrap: "wrap", justifyContent: 'flex-end', gap: '0.625rem', marginTop: "1.25rem" }}>
                        <Button
                            onClick={() => setPasswordModalVisible(false)}
                            style={{ width: '6.25rem', height: '2.5rem' }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="primary"
                            onClick={handleUpdatePassword}
                            style={{ width: '6.25rem', height: '2.5rem' }}
                        >
                            Update
                        </Button>
                    </div>
                )}
            >
                <Input.Password
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    style={{ height: '2.5rem', lineHeight: '2.5rem' }}
                />
                <Input.Password
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{ marginTop: '10px', height: '2.5rem', lineHeight: '2.5rem' }}
                />
                <Input.Password
                    placeholder="Confirm New Password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    style={{ marginTop: '10px', height: '2.5rem', lineHeight: '2.5rem' }}
                />
            </Modal>

            {/* Delete Profile Modal */}
            <Modal
                title="Delete Profile"
                visible={isDeleteModalVisible}
                maskClosable={true}
                closable={true}
                onCancel={() => setDeleteModalVisible(false)}
                centered
                footer={(
                    <div style={{ display: 'flex', flexWrap: "wrap", justifyContent: 'flex-end', gap: '0.625rem', marginTop: "1.25rem" }}>
                        <Button
                            onClick={() => setDeleteModalVisible(false)}
                            style={{ width: '6.25rem', height: '2.5rem' }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="primary"
                            danger
                            onClick={handleDeleteProfile}
                            style={{ width: '6.25rem', height: '2.5rem' }}
                        >
                            Delete
                        </Button>
                    </div>
                )}
            >
                <p>Are you sure you want to delete your profile?</p>
            </Modal>

        </div>
    );
};

export default ProfilePage;
