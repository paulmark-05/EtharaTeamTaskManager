import {
    useContext,
    useEffect,
    useState,
} from "react";

import API from "../services/api";

import toast from "react-hot-toast";

import {
    AuthContext,
} from "../context/AuthContext";



const Tasks = () => {
    const { user } =
        useContext(AuthContext);

    const [tasks, setTasks] =
        useState([]);

    const [projects, setProjects] =
        useState([]);

    const [members, setMembers] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [formData, setFormData] =
        useState({
            title: "",
            description: "",
            project: "",
            assignedTo: "",
            dueDate: "",
        });

    useEffect(() => {
        fetchTasks();
        fetchProjects();
        fetchUsers();
    }, []);

    const fetchTasks =
        async () => {
            try {
                setLoading(true);

                const res =
                    await API.get(
                        "/tasks"
                    );

                setTasks(res.data);
            } catch {
                toast.error(
                    "Failed to load tasks"
                );
            } finally {
                setLoading(false);
            }
        };

    const fetchProjects =
        async () => {
            const res =
                await API.get(
                    "/projects"
                );

            setProjects(
                res.data
            );
        };

    const fetchUsers =
        async () => {
            const res =
                await API.get(
                    "/auth/users"
                );

            setMembers(
                res.data.filter(
                    (u) =>
                        u.role ===
                        "member"
                )
            );
        };

    const handleChange = (
        e
    ) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });
    };

    const handleSubmit =
        async (e) => {
            e.preventDefault();

            try {
                await API.post(
                    "/tasks",
                    formData
                );

                toast.success(
                    "Task created ✅"
                );

                setFormData({
                    title: "",
                    description:
                        "",
                    project: "",
                    assignedTo:
                        "",
                    dueDate: "",
                });

                fetchTasks();
            } catch {
                toast.error(
                    "Failed to create task"
                );
            }
        };

    const updateStatus =
        async (
            taskId,
            status
        ) => {
            // instant UI update
            setTasks((prev) =>
                prev.map((task) =>
                    task._id === taskId
                        ? {
                            ...task,
                            status,
                        }
                        : task
                )
            );

            try {
                await API.patch(
                    `/tasks/${taskId}/status`,
                    {
                        status,
                    }
                );

                toast.success(
                    "Task updated"
                );
            } catch {
                toast.error(
                    "Update failed"
                );

                fetchTasks();
            }
        };

    const getStatusClass = (
        status
    ) => {
        switch (status) {
            case "Completed":
                return "status-green";

            case "In Progress":
                return "status-yellow";

            default:
                return "status-purple";
        }
    };

    const isOverdue = (
        dueDate,
        status
    ) => {
        return (
            new Date(
                dueDate
            ) < new Date() &&
            status !==
            "Completed"
        );
    };

    return (
        <div>
            <div className="page-header">
                <h1>Tasks</h1>
                <p>
                    Manage workflow
                </p>
            </div>

            {user?.role ===
                "admin" && (
                    <div className="card form-card">
                        <h2>
                            Create Task
                        </h2>

                        <form
                            onSubmit={
                                handleSubmit
                            }
                        >
                            <input
                                type="text"
                                name="title"
                                placeholder="Task title"
                                value={
                                    formData.title
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />

                            <textarea
                                name="description"
                                placeholder="Description"
                                value={
                                    formData.description
                                }
                                onChange={
                                    handleChange
                                }
                            />

                            <select
                                name="project"
                                value={
                                    formData.project
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            >
                                <option value="">
                                    Select Project
                                </option>

                                {projects.map(
                                    (
                                        project
                                    ) => (
                                        <option
                                            key={
                                                project._id
                                            }
                                            value={
                                                project._id
                                            }
                                        >
                                            {
                                                project.title
                                            }
                                        </option>
                                    )
                                )}
                            </select>

                            <select
                                name="assignedTo"
                                value={
                                    formData.assignedTo
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            >
                                <option value="">
                                    Assign Member
                                </option>

                                {members.map(
                                    (
                                        member
                                    ) => (
                                        <option
                                            key={
                                                member._id
                                            }
                                            value={
                                                member._id
                                            }
                                        >
                                            {
                                                member.name
                                            }
                                        </option>
                                    )
                                )}
                            </select>

                            <input
                                type="date"
                                name="dueDate"
                                value={
                                    formData.dueDate
                                }
                                onChange={
                                    handleChange
                                }
                            />

                            <button
                                type="submit"
                            >
                                Create Task
                            </button>
                        </form>
                    </div>
                )}

            {loading ? (
                <div className="loader-box">
                    Loading tasks...
                </div>
            ) : (
                <div className="task-grid">
                    {tasks.map(
                        (task) => (
                            <div
                                key={
                                    task._id
                                }
                                className={`task-card ${isOverdue(
                                    task.dueDate,
                                    task.status
                                )
                                        ? "overdue-card"
                                        : ""
                                    }`}
                            >
                                <div className="task-top">
                                    <span
                                        className={`status-pill ${getStatusClass(
                                            task.status
                                        )}`}
                                    >
                                        {
                                            task.status
                                        }
                                    </span>
                                </div>

                                <h2>
                                    {
                                        task.title
                                    }
                                </h2>

                                <p>
                                    {
                                        task.description
                                    }
                                </p>

                                <div className="task-meta">
                                    <span>
                                        📁{" "}
                                        {
                                            task
                                                .project
                                                ?.title
                                        }
                                    </span>

                                    <span>
                                        👤{" "}
                                        {
                                            task
                                                .assignedTo
                                                ?.name
                                        }
                                    </span>

                                    <span>
                                        📅{" "}
                                        {new Date(
                                            task.dueDate
                                        ).toLocaleDateString()}
                                    </span>
                                </div>

                                <select
                                    value={
                                        task.status
                                    }
                                    onChange={(
                                        e
                                    ) =>
                                        updateStatus(
                                            task._id,
                                            e.target
                                                .value
                                        )
                                    }
                                >
                                    <option value="Todo">
                                        Todo
                                    </option>

                                    <option value="In Progress">
                                        In Progress
                                    </option>

                                    <option value="Completed">
                                        Completed
                                    </option>
                                </select>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default Tasks;