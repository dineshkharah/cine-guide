import React, { useState } from 'react';
import { Modal, Button, Input, message } from 'antd';
import { PlusOutlined, CheckOutlined, UnorderedListOutlined } from '@ant-design/icons';

const AddToListModal = ({ isVisible, onCancel, mediaTitle }) => {
    const [isCreateModalVisible, setCreateModalVisible] = useState(false);
    const [lists, setLists] = useState([
        { id: 1, name: 'Favorites', containsMedia: false },
        { id: 2, name: 'Watch Later', containsMedia: true },
    ]);
    const [newListName, setNewListName] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    // Function to handle adding/removing media to/from list
    const toggleMediaInList = (listId) => {
        setLists((prevLists) =>
            prevLists.map((list) =>
                list.id === listId
                    ? { ...list, containsMedia: !list.containsMedia }
                    : list
            )
        );
    };

    // Function to handle list creation
    const handleCreateList = () => {
        const trimmedListName = newListName.trim().toLowerCase();
        const listExists = lists.some(
            (list) => list.name.toLowerCase() === trimmedListName
        );

        if (listExists) {
            setErrorMsg('List with this name already exists!');
        } else if (trimmedListName.length === 0) {
            setErrorMsg('Please enter a valid list name.');
        } else {
            setLists([...lists, { id: lists.length + 1, name: newListName, containsMedia: false }]);
            message.success(`List "${newListName}" created successfully!`);
            setNewListName('');
            setCreateModalVisible(false);
            setErrorMsg('');
        }
    };

    // Footer buttons for the "Create New List" modal
    const createListFooter = (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.625rem' }}>
            <Button
                onClick={() => {
                    setCreateModalVisible(false);
                    setErrorMsg('');
                }}
                style={{ width: '6.25rem', height: '2.5rem' }}
            >
                Cancel
            </Button>
            <Button
                type="primary"
                onClick={handleCreateList}
                style={{ width: '6.25rem', height: '2.5rem' }}
            >
                Create
            </Button>
        </div>
    );

    // Footer buttons for the main "Add to List" modal
    const mainFooter = (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.625rem' }}>
            <Button
                onClick={onCancel}
                style={{ width: '6.25rem', height: '2.5rem' }}
            >
                Cancel
            </Button>
            <Button
                type="primary"
                onClick={onCancel}
                style={{ width: '6.25rem', height: '2.5rem' }}
            >
                Add
            </Button>
        </div>
    );

    return (
        <>
            {/* Main Add to List Modal */}
            <Modal
                title={`Add "${mediaTitle}" to List`}
                visible={isVisible}
                onCancel={onCancel}
                footer={mainFooter}
                centered
            >
                <Button
                    type="dashed"
                    icon={<PlusOutlined />}
                    onClick={() => setCreateModalVisible(true)}
                    style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', marginTop: '1rem' }}
                >
                    Create New List
                </Button>

                {/* Existing lists */}
                {lists.map((list) => (
                    <div
                        key={list.id}
                        onClick={() => toggleMediaInList(list.id)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            padding: '0.5rem',
                            cursor: 'pointer',
                            borderBottom: '1px solid #f0f0f0',
                        }}
                    >
                        {list.containsMedia ? (
                            <CheckOutlined style={{ color: 'green', marginRight: '1rem' }} />
                        ) : (
                            <UnorderedListOutlined style={{ color: 'gray', marginRight: '1rem' }} />
                        )}
                        <span>{list.name}</span>
                    </div>
                ))}
            </Modal>

            {/* Create New List Modal */}
            <Modal
                title="Create New List"
                visible={isCreateModalVisible}
                onCancel={() => setCreateModalVisible(false)}
                footer={createListFooter}
                centered
            >
                <Input
                    placeholder="Enter list name"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                />
                {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
            </Modal>
        </>
    );
};

export default AddToListModal;
