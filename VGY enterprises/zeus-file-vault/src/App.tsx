import React, { useState, useEffect, useRef } from "react";
import {
  Folder,
  File,
  Search,
  Grid,
  List as ListIcon,
  Download,
  Trash2,
  Edit2,
  Copy,
  User as UserIcon,
  Shield,
  Activity,
  HardDrive,
  CheckCircle,
  AlertCircle,
  FolderPlus,
  Upload,
  Star,
  Settings,
  LogOut,
  X,
  FileText,
  FileSpreadsheet,
  FileArchive,
  FileImage,
  Eye,
  Plus,
  RefreshCw,
  MoreVertical,
  Move,
  Cpu,
  Server,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Video,
  Music
} from "lucide-react";
import { User, Role, Permission, FileItem, AuditLog, OverviewStats } from "./types";
// @ts-ignore
import zeusLogo from "./assets/images/zeus_red_logo_1783828826308.jpg";

export default function App() {
  // Auth state
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("fv_token"));
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("fv_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);

  // Active View Tab: "dashboard", "files", "admin-users", "admin-permissions", "admin-logs"
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  // File Browser State
  const [currentVolumeId, setCurrentVolumeId] = useState<string>("local-os");
  const [currentFolderPath, setCurrentFolderPath] = useState<string>("/");
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("name_asc");
  const [filterOption, setFilterOption] = useState("all");
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  // Active folder details (to track parent chains)
  const [folderCache, setFolderCache] = useState<Record<string, FileItem>>({});

  // Windows Explorer custom states
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [showDetailsPane, setShowDetailsPane] = useState<boolean>(true);
  const [isEditingPath, setIsEditingPath] = useState<boolean>(false);
  const [typedPath, setTypedPath] = useState<string>("");
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({ "root": true });
  const [subfoldersCache, setSubfoldersCache] = useState<Record<string, FileItem[]>>({});

  // Navigation history stacks
  const [navHistory, setNavHistory] = useState<Array<{id: string | null, path: string}>>([{ id: null, path: "/" }]);
  const [navHistoryIndex, setNavHistoryIndex] = useState<number>(0);

  // Modals / Input popups
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [showRenameModal, setShowRenameModal] = useState<FileItem | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [showMoveModal, setShowMoveModal] = useState<FileItem | null>(null);
  const [moveTargetFolderId, setMoveTargetFolderId] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null);
  const [previewContent, setPreviewContent] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [doubleClickBehavior, setDoubleClickBehavior] = useState<"preview" | "local">("local");
  const [localOpenHelpFile, setLocalOpenHelpFile] = useState<FileItem | null>(null);

  // File Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadingName, setUploadingName] = useState("");

  // Admin Data State
  const [adminStats, setAdminStats] = useState<OverviewStats | null>(null);
  const [adminUsers, setAdminUsers] = useState<User[]>([]);
  const [adminRoots, setAdminRoots] = useState<any[]>([]);
  const [showNewRootModal, setShowNewRootModal] = useState(false);
  const [newRootName, setNewRootName] = useState("");
  const [newRootPath, setNewRootPath] = useState("");
  const [newRootRoles, setNewRootRoles] = useState<string[]>(["super_admin"]);
  const [adminRoles, setAdminRoles] = useState<Role[]>([]);
  const [adminPermissions, setAdminPermissions] = useState<Permission[]>([]);
  const [adminLogs, setAdminLogs] = useState<AuditLog[]>([]);
  const [adminLogsFilter, setAdminLogsFilter] = useState("");

  // Admin Modal state
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserPass, setNewUserPass] = useState("");
  const [newUserRole, setNewUserRole] = useState("employee");
  const [newUserQuotaGB, setNewUserQuotaGB] = useState(1);

  const [showNewPermModal, setShowNewPermModal] = useState(false);
  const [newPermRole, setNewPermRole] = useState("employee");
  const [newPermPath, setNewPermPath] = useState("/projects/Project_A");
  const [newPermRead, setNewPermRead] = useState(true);
  const [newPermWrite, setNewPermWrite] = useState(false);
  const [newPermDelete, setNewPermDelete] = useState(false);
  const [newPermDownload, setNewPermDownload] = useState(true);
  const [newPermRename, setNewPermRename] = useState(false);
  const [assignedFolders, setAssignedFolders] = useState<FileItem[]>([]);
  const [systemFolders, setSystemFolders] = useState<FileItem[]>([]);
  const [newPermTargetType, setNewPermTargetType] = useState<"role" | "user">("role");
  const [newPermUserId, setNewPermUserId] = useState<string>("");

  const [showResetPassModal, setShowResetPassModal] = useState<User | null>(null);
  const [newPasswordValue, setNewPasswordValue] = useState("");
  const [postgresConnected, setPostgresConnected] = useState(false);

  // Context dropdown logic
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // General Notification Alert
  const [alertMessage, setAlertMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const showAlert = (text: string, type: "success" | "error" = "success") => {
    setAlertMessage({ type, text });
    setTimeout(() => setAlertMessage(null), 4000);
  };

  // Check backend auth on load
  useEffect(() => {
    if (token) {
      fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error("Stale session");
        })
        .then((data) => {
          setCurrentUser(data.user);
          setPostgresConnected(!!data.postgresConnected);
          localStorage.setItem("fv_user", JSON.stringify(data.user));
        })
        .catch(() => {
          handleLogout();
        });
    }
  }, [token]);

  const loadAssignedFolders = async () => {
    if (!token) return;
    try {
      const res = await fetch("/api/files/assigned", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const list = await res.json();
        setAssignedFolders(list);
      }
    } catch (err) {
      console.error("Error loading assigned folders:", err);
    }
  };

  useEffect(() => {
    if (token) {
      loadAssignedFolders();
    } else {
      setAssignedFolders([]);
    }
  }, [token]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginUsername || !loginPassword) return;
    setIsLoadingAuth(true);
    setLoginError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: loginUsername, password: loginPassword })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("fv_token", data.token);
      localStorage.setItem("fv_user", JSON.stringify(data.user));
      setToken(data.token);
      setCurrentUser(data.user);
      showAlert(`Successfully logged in as ${data.user.username}`);
      setLoginUsername("");
      setLoginPassword("");
    } catch (err: any) {
      setLoginError(err.message || "An error occurred");
    } finally {
      setIsLoadingAuth(false);
    }
  };

  // Quick Account Login shortcut
  const handleQuickLogin = (user: string, pass: string) => {
    setLoginUsername(user);
    setLoginPassword(pass);
    setTimeout(() => {
      const btn = document.getElementById("login-submit-btn");
      if (btn) btn.click();
    }, 100);
  };

  // Handle Logout
  const handleLogout = async () => {
    if (token) {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      }).catch(() => {});
    }
    localStorage.removeItem("fv_token");
    localStorage.removeItem("fv_user");
    setToken(null);
    setCurrentUser(null);
    setActiveTab("dashboard");
    setCurrentVolumeId("local-vol-1"); setCurrentFolderPath("/");
    setCurrentFolderPath("/");
    setFiles([]);
  };

  // Load File Explorer files
  const loadFiles = async () => {
    if (!token) return;
    setIsLoadingFiles(true);
    try {
      const res = await fetch(`/api/v1/storage/${currentVolumeId}/browse?path=${encodeURIComponent(currentFolderPath)}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Could not fetch files");
      let list: FileItem[] = await res.json();
      
      // Apply UI filters locally since the backend just returns raw dir contents
      if (searchQuery) {
        list = list.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));
      }
      if (favoritesOnly) {
        list = list.filter(f => f.isFavorite);
      }
      if (filterOption && filterOption !== "all") {
        if (filterOption === "documents") list = list.filter(f => !f.isFolder && (f.mimeType?.startsWith("text/") || f.name.endsWith(".pdf") || f.name.endsWith(".docx")));
        if (filterOption === "images") list = list.filter(f => !f.isFolder && (f.name.endsWith(".png") || f.name.endsWith(".jpg")));
        if (filterOption === "videos") list = list.filter(f => !f.isFolder && f.name.endsWith(".mp4"));
      }

      setFiles(list);
    } catch (err: any) {
      showAlert(err.message || "Failed to load files", "error");
    } finally {
      setIsLoadingFiles(false);
    }
  };

  // Reload on folder navigation / filters change
  useEffect(() => {
    if (token) {
      loadFiles();
    }
  }, [currentVolumeId, currentFolderPath, token, sortOption, filterOption, favoritesOnly]);

  // Pre-populate Root (This PC) of the sidebar folder tree
  useEffect(() => {
    if (token) {
      fetch("/api/files", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((r) => r.json())
        .then((list: FileItem[]) => {
          const subdirs = list.filter(f => f.isFolder);
          setSubfoldersCache(prev => ({
            ...prev,
            "root": subdirs
          }));
        })
        .catch((err) => console.error("Error preloading explorer tree root:", err));
    }
  }, [token]);

  const triggerManualRefresh = () => {
    loadFiles();
    if (currentUser) {
      fetch("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
        .then((r) => r.json())
        .then((data) => {
          setCurrentUser(data.user);
          setPostgresConnected(!!data.postgresConnected);
          localStorage.setItem("fv_user", JSON.stringify(data.user));
        });
    }
    showAlert("Refreshed file explorer state");
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      loadFiles();
    }
  };

  const changeFolder = (folderId: string | null, path: string, pushHistory = true) => {
    setCurrentFolderId(folderId);
    setCurrentFolderPath(path);
    setSelectedFile(null); // Clear selection on navigate
    setIsEditingPath(false);
    setTypedPath(path);

    if (pushHistory) {
      // Truncate forward history and push new state
      const nextHistory = navHistory.slice(0, navHistoryIndex + 1);
      nextHistory.push({ id: folderId, path });
      setNavHistory(nextHistory);
      setNavHistoryIndex(nextHistory.length - 1);
    }
  };

  const handleNavBack = () => {
    if (navHistoryIndex > 0) {
      const targetIndex = navHistoryIndex - 1;
      setNavHistoryIndex(targetIndex);
      const target = navHistory[targetIndex];
      changeFolder(target.id, target.path, false);
    }
  };

  const handleNavForward = () => {
    if (navHistoryIndex < navHistory.length - 1) {
      const targetIndex = navHistoryIndex + 1;
      setNavHistoryIndex(targetIndex);
      const target = navHistory[targetIndex];
      changeFolder(target.id, target.path, false);
    }
  };

  const handleNavUp = () => {
    const crumbs = getBreadcrumbs();
    if (crumbs.length > 1) {
      const parentCrumb = crumbs[crumbs.length - 2];
      const targetId = parentCrumb.id === "null" || parentCrumb.id === null ? null : parentCrumb.id;
      // Reconstruct target path
      let targetPath = "/";
      if (targetId) {
        const found = folderCache[targetId];
        if (found) targetPath = found.path;
      }
      changeFolder(targetId, targetPath);
    }
  };

  const toggleFolderExpanded = async () => {};

  const navigateToShortcut = (virtualPath: string) => {
    setActiveTab("files");
    setSearchQuery("");
    setFilterOption("all");
    setFavoritesOnly(false);

    if (virtualPath === "/") {
      changeFolder(null, "/");
      return;
    }

    fetch(`/api/files?search=${encodeURIComponent(virtualPath.split("/").pop() || "")}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((r) => r.json())
      .then((list: FileItem[]) => {
        const match = list.find((f) => f.isFolder && f.path === virtualPath);
        if (match) {
          changeFolder(match.id, match.path);
        } else {
          changeFolder(null, "/");
        }
      })
      .catch(() => {
        changeFolder(null, "/");
      });
  };

  const renderFolderTree = (parentId: string | null, depth = 0) => {
    const key = parentId || "root";
    const childFolders = subfoldersCache[key] || [];
    const isExpanded = !!expandedFolders[key];

    return (
      <div className="space-y-1">
        {parentId === null && (
          <div className="flex flex-col">
            <div 
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-[8px] hover:bg-slate-50 cursor-pointer transition-all ${
                currentFolderPath === "/" ? "bg-red-50/80 text-red-700" : "text-gray-700 hover:text-black"
              }`}
              onClick={() => changeFolder(null, "/")}
            >
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFolderExpanded(null);
                }}
                className="p-0.5 hover:bg-gray-150 rounded text-gray-500 cursor-pointer shrink-0"
              >
                <ChevronRight className={`w-3 h-3 transform transition-transform duration-150 ${isExpanded ? "rotate-90" : ""}`} />
              </button>
              <Server className="w-4 h-4 text-red-600 shrink-0" />
              <span className="truncate">Local Disk (C:)</span>
            </div>
            
            {isExpanded && (
              <div className="pl-3 ml-3.5 border-l border-gray-100 space-y-1 mt-0.5">
                {childFolders.length === 0 ? (
                  <span className="text-[10px] text-gray-400 block px-2 py-0.5 italic">Empty drive</span>
                ) : (
                  childFolders.map(folder => renderFolderTreeItem(folder, depth + 1))
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderFolderTreeItem = (folder: FileItem, depth: number) => {
    const key = folder.id;
    const isExpanded = !!expandedFolders[key];
    const childFolders = subfoldersCache[key] || [];
    const isCurrent = currentFolderId === folder.id;

    return (
      <div key={folder.id} className="flex flex-col">
        <div 
          className={`flex items-center gap-1.5 px-2 py-1.5 text-xs rounded-[8px] hover:bg-slate-50 cursor-pointer transition-all ${
            isCurrent ? "bg-red-50/80 text-red-700 font-semibold" : "text-gray-600 hover:text-black"
          }`}
          onClick={() => changeFolder(folder.id, folder.path)}
        >
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleFolderExpanded(folder.id);
            }}
            className="p-0.5 hover:bg-gray-150 rounded text-gray-400 hover:text-black cursor-pointer shrink-0"
          >
            <ChevronRight className={`w-3 h-3 transform transition-transform duration-150 ${isExpanded ? "rotate-90" : ""}`} />
          </button>
          <Folder className="w-3.5 h-3.5 text-red-600 fill-red-100 shrink-0" />
          <span className="truncate" title={folder.name}>{folder.name}</span>
        </div>

        {isExpanded && (
          <div className="pl-3 ml-3 border-l border-gray-100 space-y-1 mt-0.5">
            {childFolders.length === 0 ? (
              <span className="text-[10px] text-gray-400 block px-2 py-0.5 italic">Empty folder</span>
            ) : (
              childFolders.map(child => renderFolderTreeItem(child, depth + 1))
            )}
          </div>
        )}
      </div>
    );
  };

  // Create Folder
  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim() || !token) return;

    try {
      const res = await fetch(`/api/v1/storage/${currentVolumeId}/folder?path=${encodeURIComponent(currentFolderPath)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: newFolderName.trim(),
          parentId: currentFolderId
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create folder");

      showAlert(`Folder "${newFolderName}" created successfully`);
      setNewFolderName("");
      setShowNewFolderModal(false);
      loadFiles();
    } catch (err: any) {
      showAlert(err.message, "error");
    }
  };

  // Rename File / Folder
  const handleRename = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showRenameModal || !renameValue.trim() || !token) return;

    try {
      const res = await fetch(`/api/v1/storage/${currentVolumeId}/rename`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ newName: renameValue.trim() })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to rename");

      showAlert(`Renamed successfully to "${renameValue}"`);
      setShowRenameModal(null);
      setRenameValue("");
      loadFiles();
    } catch (err: any) {
      showAlert(err.message, "error");
    }
  };

  // Copy File
  const handleCopy = async (file: FileItem) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/v1/storage/${currentVolumeId}/copy`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to copy file");

      showAlert(`Created copy of ${file.name}`);
      loadFiles();
    } catch (err: any) {
      showAlert(err.message, "error");
    }
  };

  // Move Item Action
  const handleMove = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showMoveModal || !token) return;

    try {
      const res = await fetch(`/api/v1/storage/${currentVolumeId}/move`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ targetFolderId: moveTargetFolderId })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to move item");

      showAlert(`Successfully moved ${showMoveModal.name}`);
      setShowMoveModal(null);
      setMoveTargetFolderId(null);
      loadFiles();
    } catch (err: any) {
      showAlert(err.message, "error");
    }
  };

  // Toggle Favorite
  const handleToggleFavorite = async (file: FileItem) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/v1/storage/${file.storageVolumeId || currentVolumeId}/favorite?path=${encodeURIComponent(file.path)}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Could not toggle favorite status");
      showAlert(file.isFavorite ? `Removed ${file.name} from favorites` : `Added ${file.name} to favorites`);
      loadFiles();
    } catch (err: any) {
      showAlert(err.message, "error");
    }
  };

  // Delete Item
  const handleDelete = async (file: FileItem) => {
    if (!token) return;
    if (!confirm(`Are you sure you want to delete ${file.isFolder ? "folder" : "file"} "${file.name}"?`)) return;

    try {
      const res = await fetch(`/api/v1/storage/${file.storageVolumeId || currentVolumeId}?path=${encodeURIComponent(file.path)}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Deletion failed");

      showAlert(`Deleted "${file.name}"`);
      loadFiles();
    } catch (err: any) {
      showAlert(err.message, "error");
    }
  };

  // Secure File Download Handler
  const handleDownloadFile = async (file: FileItem) => {
    if (!token) return;
    try {
      showAlert(`Starting secure download for ${file.name}...`);
      const res = await fetch(`/api/v1/storage/${currentVolumeId}/download?path=${encodeURIComponent(file.path)}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Secure download failed");

      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err: any) {
      showAlert("Download permission denied or server storage error", "error");
    }
  };

  // Close Secure File Preview
  const closePreview = () => {
    if (previewContent && previewContent.startsWith("blob:")) {
      try {
        window.URL.revokeObjectURL(previewContent);
      } catch (err) {
        console.error("Failed to revoke object URL", err);
      }
    }
    setPreviewFile(null);
    setPreviewContent(null);
  };

  // Secure File Preview Handler
  const handlePreview = async (file: FileItem) => {
    // Revoke previous blob if any
    if (previewContent && previewContent.startsWith("blob:")) {
      try {
        window.URL.revokeObjectURL(previewContent);
      } catch (err) {
        console.error("Failed to revoke previous object URL", err);
      }
    }

    setPreviewFile(file);
    setPreviewContent(null);
    setPreviewLoading(true);

    const isText = file.mimeType.startsWith("text/") ||
      file.mimeType === "application/javascript" ||
      file.mimeType === "application/json" ||
      file.mimeType === "application/xml" ||
      file.mimeType === "image/svg+xml" ||
      [".txt", ".json", ".html", ".css", ".js", ".ts", ".tsx", ".jsx", ".py", ".java", ".cpp", ".c", ".h", ".cs", ".sh", ".bat", ".ps1", ".yml", ".yaml", ".xml", ".md", ".csv", ".ini", ".log", ".sql", ".conf", ".env"].some(ext => file.name.toLowerCase().endsWith(ext));

    const isBlobPreview = file.mimeType.startsWith("image/") ||
      file.mimeType.startsWith("audio/") ||
      file.mimeType.startsWith("video/") ||
      file.mimeType === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (isBlobPreview) {
      try {
        const res = await fetch(`/api/v1/storage/${currentVolumeId}/preview?path=${encodeURIComponent(file.path)}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const blob = await res.blob();
          const objUrl = window.URL.createObjectURL(blob);
          setPreviewContent(objUrl);
        } else {
          setPreviewContent("Failed to load file preview. Ensure you have proper permissions.");
        }
      } catch (e) {
        console.error(e);
        setPreviewContent("Error occurred during preview stream.");
      } finally {
        setPreviewLoading(false);
      }
      return;
    }

    if (isText) {
      try {
        const res = await fetch(`/api/v1/storage/${currentVolumeId}/preview?path=${encodeURIComponent(file.path)}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const text = await res.text();
          setPreviewContent(text);
        } else {
          setPreviewContent("Failed to load text preview content.");
        }
      } catch (err: any) {
        setPreviewContent("Could not download text content for viewing.");
      } finally {
        setPreviewLoading(false);
      }
      return;
    }

    setPreviewLoading(false);
  };

  // Open in Local Software Handler
  const handleOpenLocal = (file: FileItem) => {
    if (!token) return;
    
    // Generate direct download URL with query token
    const directUrl = `${window.location.origin}/api/files/download/${file.id}?token=${encodeURIComponent(token)}`;
    
    // Check if Office document
    const nameLower = file.name.toLowerCase();
    let isOfficeProtocol = false;
    let officeUri = "";
    
    if (nameLower.endsWith(".docx") || nameLower.endsWith(".doc")) {
      isOfficeProtocol = true;
      officeUri = `ms-word:ofe|u|${directUrl}`;
    } else if (nameLower.endsWith(".xlsx") || nameLower.endsWith(".xls")) {
      isOfficeProtocol = true;
      officeUri = `ms-excel:ofe|u|${directUrl}`;
    } else if (nameLower.endsWith(".pptx") || nameLower.endsWith(".ppt")) {
      isOfficeProtocol = true;
      officeUri = `ms-powerpoint:ofe|u|${directUrl}`;
    }
    
    showAlert(`Opening "${file.name}" in local software...`);
    
    if (isOfficeProtocol) {
      // Trigger Office custom desktop application protocol
      window.location.href = officeUri;
    } else {
      // Trigger native direct download
      const tempLink = document.createElement("a");
      tempLink.href = directUrl;
      tempLink.download = file.name;
      tempLink.target = "_blank";
      document.body.appendChild(tempLink);
      tempLink.click();
      tempLink.remove();
    }
    
    // Show a beautiful helpful overlay explaining how to auto-open
    setLocalOpenHelpFile(file);
  };

  // File Upload Logic
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0 || !token) return;

    const file = fileList[0];
    setUploadingName(file.name);
    setUploadProgress(10);

    try {
      const progressTimer = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev === null) return null;
          if (prev >= 85) {
            clearInterval(progressTimer);
            return prev;
          }
          return prev + 15;
        });
      }, 150);

      const res = await fetch(
        `/api/v1/storage/${currentVolumeId}/upload?filename=${encodeURIComponent(file.name)}&path=${encodeURIComponent(currentFolderPath)}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/octet-stream"
          },
          body: file
        }
      );

      clearInterval(progressTimer);
      setUploadProgress(100);

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setTimeout(() => {
        setUploadProgress(null);
        setUploadingName("");
        showAlert(`Successfully uploaded ${file.name}`);
        loadFiles();
      }, 400);

    } catch (err: any) {
      setUploadProgress(null);
      setUploadingName("");
      showAlert(err.message || "Failed to upload file", "error");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Load Admin Tables and Metrics
  const loadAdminData = async () => {
    if (!token || (currentUser?.roleId !== "super_admin" && currentUser?.roleId !== "admin")) return;

    try {
      const headers = { Authorization: `Bearer ${token}` };

      const statsRes = await fetch("/api/admin/overview", { headers });
      if (statsRes.ok) {
        setAdminStats(await statsRes.json());
      }

      const usersRes = await fetch("/api/admin/users", { headers });
      if (usersRes.ok) {
        setAdminUsers(await usersRes.json());
      }

      const rolesRes = await fetch("/api/admin/roles", { headers });
      if (rolesRes.ok) {
        setAdminRoles(await rolesRes.json());
      }

      const permsRes = await fetch("/api/admin/permissions", { headers });
      if (permsRes.ok) {
        setAdminPermissions(await permsRes.json());
      }

      const logsRes = await fetch("/api/admin/audit-logs", { headers });
      if (logsRes.ok) {
        setAdminLogs(await logsRes.json());
      }

      const rootsRes = await fetch("/api/admin/roots", { headers });
      if (rootsRes.ok) {
        setAdminRoots(await rootsRes.json());
      }
      
      const foldersRes = await fetch("/api/admin/folders", { headers });
      if (foldersRes.ok) {
        const foldersList = await foldersRes.json();
        setSystemFolders(foldersList);
        // Default selection for newly created rules to avoid empty state
        if (foldersList.length > 0 && !newPermPath) {
          setNewPermPath(foldersList[0].path);
        }
      }

      // Also reload assigned folders
      loadAssignedFolders();
    } catch (err) {
      console.error("Failed to load admin logs/tables", err);
    }
  };

  useEffect(() => {
    if (activeTab.startsWith("admin")) {
      loadAdminData();
    }
  }, [activeTab, token]);

  // Create Teammate User (Admin)
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserPass.trim() || !token) return;

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          username: newUserName.trim(),
          password: newUserPass.trim(),
          roleId: newUserRole,
          quota: newUserQuotaGB * 1024 * 1024 * 1024
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not register user");

      showAlert(`User account "${newUserName}" created successfully`);
      setNewUserName("");
      setNewUserPass("");
      setShowNewUserModal(false);
      loadAdminData();
    } catch (err: any) {
      showAlert(err.message, "error");
    }
  };

  // Toggle user status active/disabled
  const handleToggleUserStatus = async (user: User) => {
    if (!token) return;
    const nextStatus = user.status === "disabled" ? "active" : "disabled";

    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: nextStatus })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update account status");

      showAlert(`User account ${user.username} is now ${nextStatus}`);
      loadAdminData();
    } catch (err: any) {
      showAlert(err.message, "error");
    }
  };

  // Reset password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showResetPassModal || !newPasswordValue.trim() || !token) return;

    try {
      const res = await fetch(`/api/admin/users/${showResetPassModal.id}/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ newPassword: newPasswordValue.trim() })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to change user password");

      showAlert(`Password for ${showResetPassModal.username} reset successfully`);
      setShowResetPassModal(null);
      setNewPasswordValue("");
    } catch (err: any) {
      showAlert(err.message, "error");
    }
  };

  // Update User Quota limit directly
  const handleUpdateUserQuota = async (userId: string, currentQuota: number, direction: "up" | "down") => {
    if (!token) return;
    const diff = 1 * 1024 * 1024 * 1024; // 1GB
    const nextQuota = direction === "up" ? currentQuota + diff : Math.max(diff, currentQuota - diff);

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ quota: nextQuota })
      });
      if (!res.ok) throw new Error("Could not modify account storage");
      showAlert("Account space allocation updated");
      loadAdminData();
    } catch (err: any) {
      showAlert(err.message, "error");
    }
  };

  // Add Custom Folder Permission
  
  const handleAddRoot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      const res = await fetch("/api/admin/roots", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: newRootName,
          relativePath: newRootPath,
          allowedRoleIds: newRootRoles
        })
      });
      if (res.ok) {
        showAlert("Storage Location created successfully");
        setShowNewRootModal(false);
        setNewRootName("");
        setNewRootPath("");
        setNewRootRoles(["super_admin"]);
        loadAdminData();
      } else {
        const d = await res.json();
        showAlert(d.error || "Failed to create location", "error");
      }
    } catch (err) {
      showAlert("Error creating location", "error");
    }
  };

  const handleAddPermission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPermPath.trim() || !token) return;

    try {
      const payload: any = {
        folderPath: newPermPath.trim(),
        read: newPermRead,
        write: newPermWrite,
        delete: newPermDelete,
        download: newPermDownload,
        rename: newPermRename
      };

      if (newPermTargetType === "role") {
        payload.roleId = newPermRole;
      } else {
        if (!newPermUserId) {
          showAlert("Please select a specific teammate user", "error");
          return;
        }
        payload.userId = newPermUserId;
      }

      const res = await fetch("/api/admin/permissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create security rule");

      showAlert("Security permission rule saved successfully");
      setShowNewPermModal(false);
      loadAdminData();
    } catch (err: any) {
      showAlert(err.message, "error");
    }
  };

  // Revoke Custom Permission Rule
  const handleRevokePermission = async (permId: string) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/admin/permissions/${permId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Could not revoke authorization record");
      showAlert("Permission rule revoked");
      loadAdminData();
    } catch (err: any) {
      showAlert(err.message, "error");
    }
  };

  // Helper formats
  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getMimeIcon = (mime: string, name: string) => {
    const ext = name.split(".").pop()?.toLowerCase();
    if (mime === "directory") return <Folder className="w-5 h-5 text-red-600 fill-red-100" />;
    if (mime.startsWith("image/") || ["png", "jpg", "jpeg", "gif"].includes(ext || "")) {
      return <FileImage className="w-5 h-5 text-teal-600" />;
    }
    if (mime.startsWith("text/") || ["txt", "md", "json"].includes(ext || "")) {
      return <FileText className="w-5 h-5 text-gray-600" />;
    }
    if (ext === "pdf") return <File className="w-5 h-5 text-red-600" />;
    if (["xlsx", "xls", "csv"].includes(ext || "")) return <FileSpreadsheet className="w-5 h-5 text-emerald-600" />;
    if (["zip", "rar", "tar", "gz"].includes(ext || "")) return <FileArchive className="w-5 h-5 text-amber-600" />;
    return <File className="w-5 h-5 text-gray-400" />;
  };

  const getBreadcrumbs = () => {
    if (currentFolderPath === "/") return [{ name: "Home", id: null }];

    const segments = currentFolderPath.split("/").filter(Boolean);
    const crumbs = [{ name: "Home", id: null }];

    let pathAccumulator = "";
    segments.forEach((seg) => {
      pathAccumulator += "/" + seg;
      // Added TypeScript type assertion to prevent linter/compilation errors
      const cacheMatch = (Object.values(folderCache) as FileItem[]).find((f) => f.path === pathAccumulator);
      crumbs.push({
        name: seg === currentUser?.id ? "My Personal Files" : seg,
        id: cacheMatch ? cacheMatch.id : "null"
      });
    });

    return crumbs;
  };

  const calculateQuotaPct = () => {
    if (!currentUser) return 0;
    return Math.min(100, Math.round((currentUser.usedSpace / currentUser.quota) * 100));
  };

  // Filter audit logs
  const filteredLogs = adminLogs.filter((log) => {
    if (!adminLogsFilter) return true;
    const f = adminLogsFilter.toLowerCase();
    return (
      log.user.toLowerCase().includes(f) ||
      log.action.toLowerCase().includes(f) ||
      log.file.toLowerCase().includes(f) ||
      log.ip.toLowerCase().includes(f)
    );
  });

  const fileCount = files.filter((f) => !f.isFolder).length;
  const folderCount = files.filter((f) => f.isFolder).length;

  const isPreviewText = previewFile && (
    previewFile.mimeType.startsWith("text/") ||
    previewFile.mimeType === "application/javascript" ||
    previewFile.mimeType === "application/json" ||
    previewFile.mimeType === "application/xml" ||
    previewFile.mimeType === "image/svg+xml" ||
    [".txt", ".json", ".html", ".css", ".js", ".ts", ".tsx", ".jsx", ".py", ".java", ".cpp", ".c", ".h", ".cs", ".sh", ".bat", ".ps1", ".yml", ".yaml", ".xml", ".md", ".csv", ".ini", ".log", ".sql", ".conf", ".env"].some(ext => previewFile.name.toLowerCase().endsWith(ext))
  );

  const isPreviewPdf = previewFile && (
    previewFile.mimeType === "application/pdf" ||
    previewFile.name.toLowerCase().endsWith(".pdf")
  );

  const isPreviewAudio = previewFile && (
    previewFile.mimeType.startsWith("audio/") ||
    [".mp3", ".wav", ".ogg", ".m4a", ".aac"].some(ext => previewFile.name.toLowerCase().endsWith(ext))
  );

  const isPreviewVideo = previewFile && (
    previewFile.mimeType.startsWith("video/") ||
    [".mp4", ".webm", ".ogg", ".mov"].some(ext => previewFile.name.toLowerCase().endsWith(ext))
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-black">
      {/* GLOBAL BANNER NOTIFICATIONS */}
      {alertMessage && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-5 py-3 rounded-[10px] shadow-lg border text-sm font-semibold transition-all duration-300 transform translate-y-0 ${
            alertMessage.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {alertMessage.type === "success" ? (
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          )}
          <span>{alertMessage.text}</span>
          <button onClick={() => setAlertMessage(null)} className="ml-2 hover:opacity-75">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      )}

      {/* LOGIN CARD */}
      {!token || !currentUser ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-50">
          <div className="w-full max-w-md bg-white border border-gray-100 rounded-[10px] shadow-sm overflow-hidden p-8">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-16 h-16 rounded-[12px] overflow-hidden flex items-center justify-center mb-3 shadow-sm border border-gray-100 bg-white">
                <img src={zeusLogo} alt="Zeus Logo" className="w-full h-full object-cover" />
              </div>
              <h1 className="font-bold text-2xl tracking-tight uppercase text-slate-900">
                Zeus<span className="text-red-600">Vault</span>
              </h1>
              <p className="text-[10px] font-bold text-red-500 mt-1 uppercase tracking-widest">
                Lightning-Fast Secured RBAC Storage
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-700 text-xs rounded-[10px] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1.5 tracking-wider">
                  Username
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter username"
                  className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-[10px] focus:outline-none focus:ring-1 focus:ring-red-600 focus:bg-white text-black"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1.5 tracking-wider">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-[10px] focus:outline-none focus:ring-1 focus:ring-red-600 focus:bg-white text-black"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                id="login-submit-btn"
                disabled={isLoadingAuth}
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-[10px] text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer disabled:opacity-55"
              >
                {isLoadingAuth ? "Authenticating Session..." : "Secure Login"}
              </button>
            </form>

            <div className="mt-8 border-t border-gray-100 pt-6">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider text-center mb-3">
                Authorized Personnel Demo Accounts
              </p>
              <div className="grid grid-cols-2 gap-2 text-left">
                <button
                  onClick={() => handleQuickLogin("superadmin", "admin123")}
                  className="p-2 border border-gray-100 hover:border-red-200 rounded-[10px] bg-gray-50 text-left cursor-pointer transition-all hover:bg-white font-sans"
                >
                  <p className="text-[10px] font-bold uppercase tracking-wide">Super Admin</p>
                  <p className="text-[9px] text-gray-400 font-mono">superadmin / admin123</p>
                </button>
                <button
                  onClick={() => handleQuickLogin("admin", "admin123")}
                  className="p-2 border border-gray-100 hover:border-red-200 rounded-[10px] bg-gray-50 text-left cursor-pointer transition-all hover:bg-white font-sans"
                >
                  <p className="text-[10px] font-bold uppercase tracking-wide">Standard Admin</p>
                  <p className="text-[9px] text-gray-400 font-mono">admin / admin123</p>
                </button>
                <button
                  onClick={() => handleQuickLogin("manager", "manager123")}
                  className="p-2 border border-gray-100 hover:border-red-200 rounded-[10px] bg-gray-50 text-left cursor-pointer transition-all hover:bg-white font-sans"
                >
                  <p className="text-[10px] font-bold uppercase tracking-wide">Manager</p>
                  <p className="text-[9px] text-gray-400 font-mono">manager / manager123</p>
                </button>
                <button
                  onClick={() => handleQuickLogin("employee", "employee123")}
                  className="p-2 border border-gray-100 hover:border-red-200 rounded-[10px] bg-gray-50 text-left cursor-pointer transition-all hover:bg-white font-sans"
                >
                  <p className="text-[10px] font-bold uppercase tracking-wide">Employee</p>
                  <p className="text-[9px] text-gray-400 font-mono">employee / employee123</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* CORE APPLICATION LAYOUT */
        <div className="flex-1 flex flex-col h-screen overflow-hidden bg-white">
          {/* HEADER */}
          <header className="sticky top-0 z-30 h-16 border-b border-gray-100 flex items-center justify-between px-6 bg-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[8px] overflow-hidden flex items-center justify-center shadow-sm border border-gray-100 bg-white">
                <img src={zeusLogo} alt="Zeus Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-bold text-lg tracking-tight uppercase text-slate-900">
                Zeus<span className="text-red-600">Vault</span>
              </span>
            </div>

            {/* Global Search box */}
            <div className="flex-1 max-w-xl px-12">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search file names, folders, or document extensions..."
                  className="w-full bg-gray-50 border border-gray-100 rounded-[10px] py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-red-600 text-black placeholder-gray-400 font-sans"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchKeyPress}
                />
                <button onClick={loadFiles} className="absolute left-3 top-2.5">
                  <Search className="w-4 h-4 text-gray-400 hover:text-red-600" />
                </button>
              </div>
            </div>

            {/* Profile detail */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs font-semibold text-black">{currentUser.username}</p>
                <p className="text-[9px] text-red-600 font-bold uppercase tracking-wider">
                  {currentUser.roleId.replace("_", " ")}
                </p>
              </div>
              <div className="w-9 h-9 bg-gray-900 rounded-[10px] flex items-center justify-center text-white text-xs font-bold uppercase">
                {currentUser.username.substring(0, 2).toUpperCase()}
              </div>
              <button
                onClick={handleLogout}
                title="Secure logout"
                className="p-1.5 hover:bg-gray-50 text-gray-400 hover:text-red-600 rounded-[10px] transition-colors"
              >
                <LogOut className="w-4.5 h-4.5" />
              </button>
            </div>
          </header>

          <div className="flex flex-1 overflow-hidden">
            {/* SIDEBAR NAVIGATION */}
            <aside className="sticky top-0 left-0 h-[calc(100vh-4rem)] w-60 border-r border-gray-100 flex flex-col p-4 gap-6 shrink-0 bg-white overflow-y-auto z-20">
              <nav className="space-y-1">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-2">Workspace</p>
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-[10px] transition-all cursor-pointer ${
                    activeTab === "dashboard"
                      ? "bg-red-50 text-red-600 font-semibold"
                      : "text-gray-600 hover:bg-gray-50 hover:text-black"
                  }`}
                >
                  <Activity className="w-4 h-4" />
                  <span className="text-xs">Dashboard</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab("files");
                    setCurrentVolumeId("local-vol-1"); setCurrentFolderPath("/");
                    setCurrentFolderPath("/");
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-[10px] transition-all cursor-pointer ${
                    activeTab === "files" && currentFolderPath === "/"
                      ? "bg-red-50 text-red-600 font-semibold"
                      : "text-gray-600 hover:bg-gray-50 hover:text-black"
                  }`}
                >
                  <HardDrive className="w-4 h-4" />
                  <span className="text-xs">Browse Storage</span>
                </button>
              </nav>

              <nav className="space-y-1">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-2">Shortcuts</p>
                <button
                  onClick={() => navigateToShortcut(`/users/${currentUser.id}/My Files`)}
                  className="w-full flex items-center gap-3 px-3 py-1.5 text-left text-xs text-gray-600 hover:bg-gray-50 hover:text-black rounded-[10px]"
                >
                  <Folder className="w-3.5 h-3.5 text-red-600 fill-red-100 shrink-0" />
                  <span className="truncate">My Files</span>
                </button>
                <button
                  onClick={() => navigateToShortcut(`/projects/Project_A`)}
                  className="w-full flex items-center gap-3 px-3 py-1.5 text-left text-xs text-gray-600 hover:bg-gray-50 hover:text-black rounded-[10px]"
                >
                  <Folder className="w-3.5 h-3.5 text-red-500 fill-red-50 shrink-0" />
                  <span className="truncate">Project A (Specs)</span>
                </button>
                <button
                  onClick={() => navigateToShortcut(`/departments/HR`)}
                  className="w-full flex items-center gap-3 px-3 py-1.5 text-left text-xs text-gray-600 hover:bg-gray-50 hover:text-black rounded-[10px]"
                >
                  <Folder className="w-3.5 h-3.5 text-amber-500 fill-amber-50 shrink-0" />
                  <span className="truncate">HR Department</span>
                </button>
                <button
                  onClick={() => navigateToShortcut(`/templates`)}
                  className="w-full flex items-center gap-3 px-3 py-1.5 text-left text-xs text-gray-600 hover:bg-gray-50 hover:text-black rounded-[10px]"
                >
                  <Folder className="w-3.5 h-3.5 text-emerald-500 fill-emerald-50 shrink-0" />
                  <span className="truncate">Standard Templates</span>
                </button>
                <button
                  onClick={() => navigateToShortcut(`/archive`)}
                  className="w-full flex items-center gap-3 px-3 py-1.5 text-left text-xs text-gray-600 hover:bg-gray-50 hover:text-black rounded-[10px]"
                >
                  <Folder className="w-3.5 h-3.5 text-purple-500 fill-purple-50 shrink-0" />
                  <span className="truncate">Corporate Archive</span>
                </button>
              </nav>

              {/* This PC Directory Tree */}
              <nav className="space-y-1 select-none">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-2">This PC</p>
                <div className="px-1">
                  {renderFolderTree(null)}
                </div>
              </nav>

              {assignedFolders.length > 0 && (
                <nav className="space-y-1">
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-2">My Assigned Folders</p>
                  {assignedFolders.map((folder) => (
                    <button
                      key={folder.id}
                      onClick={() => navigateToShortcut(folder.path)}
                      className="w-full flex items-center gap-3 px-3 py-1.5 text-left text-xs text-gray-600 hover:bg-gray-50 hover:text-black rounded-[10px] cursor-pointer"
                    >
                      <Folder className="w-3.5 h-3.5 text-red-600 fill-red-50 shrink-0" />
                      <span className="truncate" title={folder.path}>{folder.name}</span>
                    </button>
                  ))}
                </nav>
              )}

              {(currentUser.roleId === "super_admin" || currentUser.roleId === "admin") && (
                <nav className="space-y-1">
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-2">Administration</p>
                  <button
                    onClick={() => setActiveTab("admin-users")}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-[10px] transition-all cursor-pointer ${
                      activeTab === "admin-users"
                        ? "bg-red-50 text-red-600 font-semibold"
                        : "text-gray-600 hover:bg-gray-50 hover:text-black"
                    }`}
                  >
                    <UserIcon className="w-4 h-4" />
                    <span className="text-xs">User Quotas & Status</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("admin-roots")}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-[10px] transition-all cursor-pointer ${
                      activeTab === "admin-roots"
                        ? "bg-red-50 text-red-600 font-semibold"
                        : "text-gray-600 hover:bg-gray-50 hover:text-black"
                    }`}
                  >
                    <HardDrive className="w-4 h-4" />
                    <span className="text-xs">Storage Locations</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("admin-permissions")}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-[10px] transition-all cursor-pointer ${
                      activeTab === "admin-permissions"
                        ? "bg-red-50 text-red-600 font-semibold"
                        : "text-gray-600 hover:bg-gray-50 hover:text-black"
                    }`}
                  >
                    <Shield className="w-4 h-4" />
                    <span className="text-xs">RBAC Rule Engine</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("admin-logs")}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-[10px] transition-all cursor-pointer ${
                      activeTab === "admin-logs"
                        ? "bg-red-50 text-red-600 font-semibold"
                        : "text-gray-600 hover:bg-gray-50 hover:text-black"
                    }`}
                  >
                    <Settings className="w-4 h-4" />
                    <span className="text-xs">Audit Event Logs</span>
                  </button>
                </nav>
              )}

              {/* STORAGE QUOTA DISPLAY */}
              <div className="mt-auto p-4 bg-gray-50 rounded-[10px] border border-gray-100">
                <p className="text-[10px] font-bold text-gray-500 mb-1.5 uppercase tracking-wide">My Storage Quota</p>
                <div className="w-full bg-gray-200 h-2 rounded-full mb-2 overflow-hidden">
                  <div
                    className="bg-red-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${calculateQuotaPct()}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center text-[9px] text-gray-500 font-medium font-sans">
                  <span>{formatSize(currentUser.usedSpace)} used</span>
                  <span>{calculateQuotaPct()}%</span>
                </div>
                <p className="text-[8px] text-gray-400 mt-1 uppercase text-center tracking-wider">
                  Total Allocation: {formatSize(currentUser.quota)}
                </p>
              </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 bg-white p-6 overflow-hidden flex flex-col gap-6">
              {/* TAB 1: DASHBOARD OVERVIEW */}
              {activeTab === "dashboard" && (
                <div className="flex-1 overflow-y-auto space-y-6">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <div>
                      <h2 className="text-lg font-bold text-black tracking-tight">System Dashboard</h2>
                      <p className="text-xs text-gray-400 font-semibold mt-0.5 uppercase tracking-wider">
                        Welcome back, {currentUser.username} // Secured physical link operational
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={triggerManualRefresh}
                        className="px-3.5 py-1.5 border border-gray-200 hover:border-red-600 bg-white text-gray-600 hover:text-red-600 rounded-[10px] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5 font-sans" />
                        Synchronize Files
                      </button>
                    </div>
                  </div>

                  {/* Top Stats Grid */}
                  <div className="grid grid-cols-4 gap-4">
                    <div className="border border-gray-100 p-4 bg-white rounded-[10px] shadow-sm">
                      <p className="text-[9px] uppercase font-bold text-gray-400 mb-1 tracking-wider">Role Access Tier</p>
                      <p className="text-xl font-bold uppercase text-red-600">{currentUser.roleId.replace("_", " ")}</p>
                      <p className="text-[9px] text-gray-400 font-semibold mt-1">SECURED LAN PROXY ACTIVE</p>
                    </div>
                    <div className="border border-gray-100 p-4 bg-white rounded-[10px] shadow-sm">
                      <p className="text-[9px] uppercase font-bold text-gray-400 mb-1 tracking-wider">Discovered Files</p>
                      <p className="text-xl font-bold">{fileCount || 6} items</p>
                      <p className="text-[9px] text-emerald-600 font-bold mt-1">No file traversal errors</p>
                    </div>
                    <div className="border border-gray-100 p-4 bg-white rounded-[10px] shadow-sm">
                      <p className="text-[9px] uppercase font-bold text-gray-400 mb-1 tracking-wider">Discovered Folders</p>
                      <p className="text-xl font-bold">{folderCount || 12} nodes</p>
                      <p className="text-[9px] text-gray-400 font-semibold mt-1">Mounted local partitions</p>
                    </div>
                    <div className="border border-gray-100 p-4 bg-white rounded-[10px] shadow-sm">
                      <p className="text-[9px] uppercase font-bold text-gray-400 mb-1 tracking-wider">Allocated Vault Limit</p>
                      <p className="text-xl font-bold">{formatSize(currentUser.quota)}</p>
                      <p className="text-[9px] text-red-600 font-bold mt-1">
                        {formatSize(currentUser.quota - currentUser.usedSpace)} free bytes
                      </p>
                    </div>
                  </div>

                  {/* ADMIN METRICS PANEL: STORAGE & CPU CLUSTER STATUS */}
                  {adminStats && (currentUser.roleId === "super_admin" || currentUser.roleId === "admin") && (
                    <div className="border border-red-100 rounded-[12px] bg-red-50/10 p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse"></div>
                          <h3 className="text-xs font-extrabold text-red-700 uppercase tracking-widest font-mono">
                            ZeusVault Core Storage & Host CPU Cluster Status
                          </h3>
                        </div>
                        <span className="text-[10px] font-mono font-bold bg-red-100 text-red-800 px-2 py-0.5 rounded-full uppercase">
                          Live Node Connection
                        </span>
                      </div>

                      <div className="grid grid-cols-4 gap-4">
                        {/* CARD 1: Host CPU Pool */}
                        <div className="bg-white border border-gray-100 rounded-[10px] p-4 shadow-sm relative overflow-hidden">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Host CPU Load</p>
                            <Cpu className="w-4 h-4 text-red-600" />
                          </div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-2xl font-black text-gray-900 tracking-tight">
                              {adminStats.cpuLoad || 18}%
                            </span>
                            <span className="text-[10px] text-green-600 font-bold">Stable</span>
                          </div>
                          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2.5 overflow-hidden">
                            <div
                              className="bg-red-600 h-full rounded-full transition-all duration-500"
                              style={{ width: `${adminStats.cpuLoad || 18}%` }}
                            ></div>
                          </div>
                          <p className="text-[9px] text-gray-400 mt-1.5 font-mono">
                            Core Temp: {adminStats.cpuTemp || 43}°C / 4 Cores Active
                          </p>
                        </div>

                        {/* CARD 2: Total Storage of Storage CPU */}
                        <div className="bg-white border border-gray-100 rounded-[10px] p-4 shadow-sm relative overflow-hidden">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Total Cluster Storage</p>
                            <Server className="w-4 h-4 text-red-600" />
                          </div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-2xl font-black text-gray-900 tracking-tight">
                              {formatSize(adminStats.systemTotalSpace || (100 * 1024 * 1024 * 1024))}
                            </span>
                          </div>
                          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2.5 overflow-hidden">
                            <div
                              className="bg-red-600 h-full rounded-full transition-all duration-500"
                              style={{ width: "100%" }}
                            ></div>
                          </div>
                          <p className="text-[9px] text-gray-400 mt-1.5 font-mono">
                            RAID-6 Storage Node Pool
                          </p>
                        </div>

                        {/* CARD 3: Allocated Storage Quotas */}
                        <div className="bg-white border border-gray-100 rounded-[10px] p-4 shadow-sm relative overflow-hidden">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Allocated Storage Quotas</p>
                            <HardDrive className="w-4 h-4 text-red-600" />
                          </div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-2xl font-black text-gray-900 tracking-tight">
                              {formatSize(adminStats.totalQuotaAllocated)}
                            </span>
                            <span className="text-[10px] text-gray-500 font-bold">
                              ({Math.round((adminStats.totalQuotaAllocated / (adminStats.systemTotalSpace || (100 * 1024 * 1024 * 1024))) * 100)}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2.5 overflow-hidden">
                            <div
                              className="bg-amber-500 h-full rounded-full transition-all duration-500"
                              style={{ width: `${Math.min(100, Math.round((adminStats.totalQuotaAllocated / (adminStats.systemTotalSpace || (100 * 1024 * 1024 * 1024))) * 100))}%` }}
                            ></div>
                          </div>
                          <p className="text-[9px] text-gray-400 mt-1.5 font-mono">
                            Assigned across {adminStats.activeUsers} corporate roles
                          </p>
                        </div>

                        {/* CARD 4: Physical Free Storage Space */}
                        <div className="bg-white border border-gray-100 rounded-[10px] p-4 shadow-sm relative overflow-hidden">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Physical Free Space</p>
                            <Activity className="w-4 h-4 text-red-600" />
                          </div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-2xl font-black text-gray-900 tracking-tight">
                              {formatSize(adminStats.systemFreeSpace)}
                            </span>
                            <span className="text-[10px] text-green-600 font-bold">Available</span>
                          </div>
                          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2.5 overflow-hidden">
                            <div
                              className="bg-green-600 h-full rounded-full transition-all duration-500"
                              style={{ width: `${Math.round((adminStats.systemFreeSpace / (adminStats.systemTotalSpace || (100 * 1024 * 1024 * 1024))) * 100)}%` }}
                            ></div>
                          </div>
                          <p className="text-[9px] text-gray-400 mt-1.5 font-mono">
                            Physical Used: {formatSize(adminStats.spaceUsed)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quick-Access Folders */}
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                      Assigned Zeus Vault Partitions
                    </h3>
                    <div className="grid grid-cols-4 gap-4">
                      <div
                        onClick={() => navigateToShortcut(`/users/${currentUser.id}/My Files`)}
                        className="p-4 border border-gray-100 hover:border-red-200 rounded-[10px] bg-slate-50 hover:bg-white transition-all cursor-pointer flex flex-col gap-2"
                      >
                        <Folder className="w-8 h-8 text-red-600 fill-red-100" />
                        <div>
                          <p className="text-xs font-bold">Personal Vault</p>
                          <p className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold">
                            Private File Storage
                          </p>
                        </div>
                      </div>

                      <div
                        onClick={() => navigateToShortcut(`/projects/Project_A`)}
                        className="p-4 border border-gray-100 hover:border-red-200 rounded-[10px] bg-slate-50 hover:bg-white transition-all cursor-pointer flex flex-col gap-2"
                      >
                        <Folder className="w-8 h-8 text-red-500 fill-red-50" />
                        <div>
                          <p className="text-xs font-bold">Project Alpha Hub</p>
                          <p className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold">
                            Collaborative Docs
                          </p>
                        </div>
                      </div>

                      <div
                        onClick={() => navigateToShortcut(`/departments/HR`)}
                        className="p-4 border border-gray-100 hover:border-red-200 rounded-[10px] bg-slate-50 hover:bg-white transition-all cursor-pointer flex flex-col gap-2"
                      >
                        <Folder className="w-8 h-8 text-amber-500 fill-amber-50" />
                        <div>
                          <p className="text-xs font-bold">Human Resources</p>
                          <p className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold">
                            Assigned Department
                          </p>
                        </div>
                      </div>

                      <div
                        onClick={() => navigateToShortcut(`/templates`)}
                        className="p-4 border border-gray-100 hover:border-red-200 rounded-[10px] bg-slate-50 hover:bg-white transition-all cursor-pointer flex flex-col gap-2"
                      >
                        <Folder className="w-8 h-8 text-emerald-500 fill-emerald-50" />
                        <div>
                          <p className="text-xs font-bold">Global Templates</p>
                          <p className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold">
                            Standard Documents
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Custom Assigned Folders */}
                  {assignedFolders.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                        Custom Authorized Drives
                      </h3>
                      <div className="grid grid-cols-4 gap-4">
                        {assignedFolders.map((folder) => (
                          <div
                            key={folder.id}
                            onClick={() => navigateToShortcut(folder.path)}
                            className="p-4 border border-gray-100 hover:border-red-200 rounded-[10px] bg-slate-50 hover:bg-white transition-all cursor-pointer flex flex-col gap-2"
                          >
                            <Folder className="w-8 h-8 text-red-600 fill-red-50" />
                            <div>
                              <p className="text-xs font-bold truncate">{folder.name}</p>
                              <p className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold truncate" title={folder.path}>
                                {folder.path}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* App Policy */}
                  <div className="p-5 border border-gray-100 rounded-[10px] bg-red-50/20 text-xs text-gray-700 space-y-2">
                    <p className="font-bold text-gray-900 uppercase tracking-wide">Enterprise Operations Policy</p>
                    <p>
                      All file operations are <strong>fully mediated by this Web Server</strong>. Teammates are strictly
                      prohibited from directly logging into the raw Storage CPU. The actual server paths are
                      masked to maintain strict directory protection.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 2: ACTIVE FILE EXPLORER VIEW */}
              {activeTab === "files" && (
                <div className="flex-1 flex flex-col overflow-hidden bg-white">
                  {/* Windows Explorer Header Bar (Navigation and Address) */}
                  <div className="flex items-center gap-2 border-b border-gray-150 pb-3 mb-2 shrink-0 select-none">
                    {/* History & Up controls */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={handleNavBack}
                        disabled={navHistoryIndex === 0}
                        title="Go back"
                        className="p-1.5 hover:bg-gray-100 rounded-md disabled:opacity-30 disabled:hover:bg-transparent text-gray-700 cursor-pointer transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleNavForward}
                        disabled={navHistoryIndex >= navHistory.length - 1}
                        title="Go forward"
                        className="p-1.5 hover:bg-gray-100 rounded-md disabled:opacity-30 disabled:hover:bg-transparent text-gray-700 cursor-pointer transition-colors"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleNavUp}
                        disabled={currentFolderPath === "/"}
                        title="Up to Parent Directory"
                        className="p-1.5 hover:bg-gray-100 rounded-md disabled:opacity-30 disabled:hover:bg-transparent text-gray-700 cursor-pointer transition-colors"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={triggerManualRefresh}
                        title="Refresh"
                        className="p-1.5 hover:bg-gray-100 rounded-md text-gray-700 cursor-pointer transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Path Address Bar */}
                    <div className="flex-1 flex items-center border border-gray-200 hover:border-gray-300 rounded-[6px] bg-white h-8 overflow-hidden relative">
                      <div className="pl-2.5 pr-1 text-gray-400 shrink-0">
                        <Server className="w-3.5 h-3.5" />
                      </div>
                      
                      {!isEditingPath ? (
                        /* Clickable Breadcrumbs */
                        <div 
                          className="flex-1 flex items-center gap-1 text-[11px] font-sans font-medium px-2 overflow-x-auto whitespace-nowrap h-full cursor-text"
                          onClick={() => {
                            setIsEditingPath(true);
                            setTypedPath(currentFolderPath);
                          }}
                        >
                          {getBreadcrumbs().map((crumb, idx) => (
                            <React.Fragment key={idx}>
                              {idx > 0 && <span className="text-gray-300">›</span>}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation(); // Avoid triggering edit mode
                                  if (crumb.id === "null" || crumb.id === null) {
                                    navigateToShortcut("/");
                                  } else {
                                    changeFolder(crumb.id, folderCache[crumb.id]?.path || "/");
                                  }
                                }}
                                className={`hover:bg-red-50 hover:text-red-600 px-1.5 py-0.5 rounded cursor-pointer transition-all ${
                                  idx === getBreadcrumbs().length - 1 ? "font-bold text-gray-900" : "text-gray-500 font-medium"
                                }`}
                              >
                                {crumb.name === "Home" ? "This PC" : crumb.name}
                              </button>
                            </React.Fragment>
                          ))}
                        </div>
                      ) : (
                        /* Direct Path Input Form */
                        <form 
                          onSubmit={(e) => {
                            e.preventDefault();
                            setIsEditingPath(false);
                            if (typedPath === "/" || typedPath === "") {
                              changeFolder(null, "/");
                              return;
                            }
                            const trimmedPath = typedPath.trim();
                            fetch(`/api/files?search=${encodeURIComponent(trimmedPath.split("/").pop() || "")}`, {
                              headers: { Authorization: `Bearer ${token}` }
                            })
                              .then((r) => r.json())
                              .then((list: FileItem[]) => {
                                const match = list.find((f) => f.isFolder && f.path === trimmedPath);
                                if (match) {
                                  changeFolder(match.id, match.path);
                                } else if (trimmedPath === "/") {
                                  changeFolder(null, "/");
                                } else {
                                  showAlert(`Folder path "${trimmedPath}" not found.`, "error");
                                }
                              })
                              .catch(() => {
                                showAlert("Error checking folder path", "error");
                              });
                          }}
                          className="flex-1 h-full flex"
                        >
                          <input
                            type="text"
                            value={typedPath}
                            onChange={(e) => setTypedPath(e.target.value)}
                            onBlur={() => {
                              setTimeout(() => setIsEditingPath(false), 200);
                            }}
                            autoFocus
                            className="flex-1 bg-transparent px-2 text-xs font-mono outline-none text-gray-800"
                            placeholder="Type a virtual path (e.g. /projects/Project_A)"
                          />
                        </form>
                      )}
                    </div>

                    {/* Integrated Search Bar inside address area */}
                    <div className="w-56 relative shrink-0">
                      <input
                        type="text"
                        placeholder="Search current folder..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearchKeyPress}
                        className="w-full h-8 pl-8 pr-3 text-xs border border-gray-200 rounded-[6px] focus:outline-none focus:ring-1 focus:ring-red-600 bg-white"
                      />
                      <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                      {searchQuery && (
                        <button
                          onClick={() => {
                            setSearchQuery("");
                            loadFiles();
                          }}
                          className="absolute right-2 top-2 text-gray-400 hover:text-black text-xs font-bold font-sans"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Action Command Bar Ribbon */}
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-2 shrink-0 select-none">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowNewFolderModal(true)}
                        className="px-3 py-1.5 hover:bg-gray-100 border border-transparent rounded-[6px] text-xs font-semibold text-gray-700 hover:text-black flex items-center gap-1.5 cursor-pointer transition-all"
                      >
                        <FolderPlus className="w-4 h-4 text-red-600" />
                        <span>New folder</span>
                      </button>

                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 hover:bg-gray-100 border border-transparent rounded-[6px] text-xs font-semibold text-gray-700 hover:text-black flex items-center gap-1.5 cursor-pointer transition-all"
                      >
                        <Upload className="w-4 h-4 text-red-600" />
                        <span>Upload</span>
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        className="hidden"
                      />

                      <div className="h-4 w-px bg-gray-200 mx-1"></div>

                      {/* Filter selection */}
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-gray-400 font-bold uppercase font-mono">Filter:</span>
                        <select
                          value={filterOption}
                          onChange={(e) => setFilterOption(e.target.value)}
                          className="px-2 py-1 bg-transparent text-xs font-semibold text-gray-600 hover:text-black focus:outline-none cursor-pointer border border-transparent hover:border-gray-100 rounded-md"
                        >
                          <option value="all">All Files</option>
                          <option value="documents">PDF & Documents</option>
                          <option value="images">Image Attachments</option>
                          <option value="videos">Video Formats</option>
                        </select>
                      </div>

                      {/* Sort option */}
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-gray-400 font-bold uppercase font-mono">Sort:</span>
                        <select
                          value={sortOption}
                          onChange={(e) => setSortOption(e.target.value)}
                          className="px-2 py-1 bg-transparent text-xs font-semibold text-gray-600 hover:text-black focus:outline-none cursor-pointer border border-transparent hover:border-gray-100 rounded-md"
                        >
                          <option value="name_asc">Name (A-Z)</option>
                          <option value="name_desc">Name (Z-A)</option>
                          <option value="size_asc">Size (Smallest)</option>
                          <option value="size_desc">Size (Largest)</option>
                          <option value="date_desc">Date (Newest)</option>
                          <option value="date_asc">Date (Oldest)</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Star filter */}
                      <button
                        onClick={() => setFavoritesOnly(!favoritesOnly)}
                        title="Filter starred items"
                        className={`p-1.5 border rounded-[6px] transition-all cursor-pointer ${
                          favoritesOnly
                            ? "bg-amber-50 border-amber-200 text-amber-600"
                            : "border-transparent text-gray-400 hover:bg-gray-100 hover:text-black"
                        }`}
                      >
                        <Star className={`w-3.5 h-3.5 ${favoritesOnly ? "fill-amber-500" : ""}`} />
                      </button>

                      {/* Double-Click Behavior Setting */}
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 border border-gray-150 rounded-[6px] shrink-0">
                        <span className="text-[10px] text-gray-500 font-bold uppercase font-mono hidden md:inline">On Double Click:</span>
                        <select
                          value={doubleClickBehavior}
                          onChange={(e) => setDoubleClickBehavior(e.target.value as "preview" | "local")}
                          className="bg-transparent text-[11px] font-semibold text-gray-700 focus:outline-none cursor-pointer"
                          title="Choose action when double clicking a file"
                        >
                          <option value="preview">🛡️ Web Preview</option>
                          <option value="local">💻 Local Software</option>
                        </select>
                      </div>

                      {/* View Options Toggle */}
                      <div className="flex border border-gray-200 rounded-[6px] overflow-hidden">
                        <button
                          onClick={() => setViewMode("list")}
                          title="Details view"
                          className={`p-1.5 cursor-pointer transition-colors ${
                            viewMode === "list" ? "bg-gray-100 text-black" : "bg-white text-gray-400 hover:text-black"
                          }`}
                        >
                          <ListIcon className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setViewMode("grid")}
                          title="Large icons view"
                          className={`p-1.5 cursor-pointer transition-colors ${
                            viewMode === "grid" ? "bg-gray-100 text-black" : "bg-white text-gray-400 hover:text-black"
                          }`}
                        >
                          <Grid className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Details Pane Toggle */}
                      <button
                        onClick={() => setShowDetailsPane(!showDetailsPane)}
                        title="Toggle Details Pane"
                        className={`p-1.5 border rounded-[6px] transition-all cursor-pointer ${
                          showDetailsPane
                            ? "bg-red-50 border-red-200 text-red-600"
                            : "border-transparent text-gray-400 hover:bg-gray-100 hover:text-black"
                        }`}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Upload Progress Bar */}
                  {uploadProgress !== null && (
                    <div className="bg-red-50 border border-red-100 px-4 py-2.5 rounded-[10px] flex items-center justify-between shrink-0 my-2">
                      <div className="flex items-center gap-2 text-xs font-semibold text-red-800 truncate">
                        <RefreshCw className="w-4 h-4 animate-spin text-red-600 shrink-0" />
                        <span className="truncate">Uploading: {uploadingName}</span>
                      </div>
                      <div className="flex items-center gap-4 w-48 shrink-0">
                        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-red-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                        <span className="text-[10px] font-bold text-red-600">{uploadProgress}%</span>
                      </div>
                    </div>
                  )}

                  {/* Split Workspace Layout */}
                  <div className="flex-1 flex overflow-hidden min-h-0">
                    
                    {/* LEFT CONTAINER: Main File Explorer List/Grid */}
                    <div className="flex-1 flex flex-col overflow-y-auto min-h-0 py-2 pr-1">
                      {isLoadingFiles ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400 select-none font-sans">
                          <RefreshCw className="w-8 h-8 animate-spin text-red-600" />
                          <span className="text-xs font-bold uppercase tracking-wider">Accessing LAN StorageCPU...</span>
                        </div>
                      ) : files.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-gray-400 text-center select-none font-sans">
                          <Folder className="w-12 h-12 text-gray-200 mb-2" />
                          <p className="text-xs font-bold uppercase tracking-wider text-gray-500">This folder is empty</p>
                          <p className="text-[11px] text-gray-400 mt-1 max-w-xs leading-normal">
                            Use the ribbon command bar above to create a new folder or upload file objects.
                          </p>
                        </div>
                      ) : viewMode === "list" ? (
                        /* DETAILS / LIST VIEW */
                        <div className="border border-gray-100 rounded-[10px] overflow-hidden shadow-sm bg-white">
                          <table className="w-full text-xs text-left border-collapse font-sans">
                            <thead>
                              <tr className="text-[9px] uppercase font-bold text-gray-400 border-b border-gray-100 bg-slate-50 select-none">
                                <th className="px-6 py-3.5">Name</th>
                                <th className="px-6 py-3.5">Type</th>
                                <th className="px-6 py-3.5">Owner</th>
                                <th className="px-6 py-3.5">Size</th>
                                <th className="px-6 py-3.5">Date Modified</th>
                                <th className="px-6 py-3.5 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              {files.map((file) => (
                                <tr
                                  key={file.id}
                                  onClick={() => setSelectedFile(file)}
                                  onDoubleClick={() => {
                                    if (file.isFolder) {
                                      changeFolder(file.id, file.path);
                                    } else {
                                      if (doubleClickBehavior === "local") {
                                        handleOpenLocal(file);
                                      } else {
                                        handlePreview(file);
                                      }
                                    }
                                  }}
                                  className={`transition-colors group cursor-pointer select-none ${
                                    selectedFile?.id === file.id
                                      ? "bg-red-50/60 hover:bg-red-50/80"
                                      : "hover:bg-slate-50/60 odd:bg-white even:bg-slate-50/10"
                                  }`}
                                >
                                  <td className="px-6 py-3">
                                    <div className="flex items-center gap-3">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleToggleFavorite(file);
                                        }}
                                        className="text-gray-300 hover:text-amber-500 cursor-pointer"
                                      >
                                        <Star
                                          className={`w-3.5 h-3.5 ${
                                            file.isFavorite ? "text-amber-500 fill-amber-500" : ""
                                          }`}
                                        />
                                      </button>
                                      <div className="shrink-0">{getMimeIcon(file.mimeType, file.name)}</div>
                                      <span className={`truncate ${file.isFolder ? "font-bold text-gray-900" : "font-medium text-gray-700"}`}>
                                        {file.name}
                                      </span>
                                      {file.version > 1 && (
                                        <span className="bg-red-50 text-red-600 text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase scale-90">
                                          v{file.version}
                                        </span>
                                      )}
                                    </div>
                                  </td>
                                  <td className="px-6 py-3">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">
                                      {file.mimeType === "directory" ? "Folder" : file.name.split(".").pop() || "File"}
                                    </span>
                                  </td>
                                  <td className="px-6 py-3 text-gray-500 font-medium">{file.ownerName}</td>
                                  <td className="px-6 py-3 text-gray-400">
                                    {file.isFolder ? "--" : formatSize(file.size)}
                                  </td>
                                  <td className="px-6 py-3 text-gray-400 font-mono">
                                    {new Date(file.updatedAt).toLocaleDateString()}
                                  </td>
                                  <td className="px-6 py-3">
                                    <div className="flex items-center justify-end gap-1">
                                      {!file.isFolder && (
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handlePreview(file);
                                          }}
                                          className="p-1.5 hover:bg-gray-100 rounded-[6px] text-gray-400 hover:text-black cursor-pointer"
                                          title="Preview"
                                        >
                                          <Eye className="w-3.5 h-3.5" />
                                        </button>
                                      )}
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleDownloadFile(file);
                                        }}
                                        className="p-1.5 hover:bg-gray-100 rounded-[6px] text-gray-400 hover:text-emerald-600 cursor-pointer"
                                        title="Secure download"
                                      >
                                        <Download className="w-3.5 h-3.5" />
                                      </button>

                                      <div className="relative">
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveMenuId(activeMenuId === file.id ? null : file.id);
                                          }}
                                          className="p-1.5 hover:bg-gray-100 rounded-[6px] text-gray-400 hover:text-black cursor-pointer"
                                        >
                                          <MoreVertical className="w-3.5 h-3.5" />
                                        </button>
                                        {activeMenuId === file.id && (
                                          <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-100 rounded-[10px] shadow-lg z-20 py-1 text-left font-sans">
                                            {!file.isFolder && (
                                              <button
                                                onClick={() => {
                                                  setActiveMenuId(null);
                                                  handleOpenLocal(file);
                                                }}
                                                className="w-full px-3 py-1.5 text-left hover:bg-blue-50 text-[11px] font-bold flex items-center gap-2 text-blue-700 cursor-pointer animate-pulse"
                                              >
                                                <svg className="w-3.5 h-3.5 text-blue-600 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                                Open Local App
                                              </button>
                                            )}
                                            {!file.isFolder && (
                                              <button
                                                onClick={() => {
                                                  setActiveMenuId(null);
                                                  handleCopy(file);
                                                }}
                                                className="w-full px-3 py-1.5 text-left hover:bg-slate-50 text-[11px] font-semibold flex items-center gap-2 text-gray-700 cursor-pointer"
                                              >
                                                <Copy className="w-3.5 h-3.5" />
                                                Make Copy
                                              </button>
                                            )}
                                            <button
                                              onClick={() => {
                                                setActiveMenuId(null);
                                                setMoveTargetFolderId(file.parentId);
                                                setShowMoveModal(file);
                                              }}
                                              className="w-full px-3 py-1.5 text-left hover:bg-slate-50 text-[11px] font-semibold flex items-center gap-2 text-gray-700 cursor-pointer"
                                            >
                                              <Move className="w-3.5 h-3.5" />
                                              Relocate
                                            </button>
                                            <button
                                              onClick={() => {
                                                setActiveMenuId(null);
                                                setRenameValue(file.name);
                                                setShowRenameModal(file);
                                              }}
                                              className="w-full px-3 py-1.5 text-left hover:bg-slate-50 text-[11px] font-semibold flex items-center gap-2 text-gray-700 cursor-pointer"
                                            >
                                              <Edit2 className="w-3.5 h-3.5" />
                                              Rename
                                            </button>
                                            <button
                                              onClick={() => {
                                                setActiveMenuId(null);
                                                handleDelete(file);
                                              }}
                                              className="w-full px-3 py-1.5 text-left hover:bg-slate-50 text-[11px] font-semibold flex items-center gap-2 text-red-600 hover:text-red-700 cursor-pointer"
                                            >
                                              <Trash2 className="w-3.5 h-3.5" />
                                              Remove
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        /* LARGE ICONS / GRID VIEW */
                        <div className="grid grid-cols-5 gap-4">
                          {files.map((file) => (
                            <div
                              key={file.id}
                              onClick={() => setSelectedFile(file)}
                              onDoubleClick={() => {
                                if (file.isFolder) {
                                  changeFolder(file.id, file.path);
                                } else {
                                  if (doubleClickBehavior === "local") {
                                    handleOpenLocal(file);
                                  } else {
                                    handlePreview(file);
                                  }
                                }
                              }}
                              className={`border rounded-[10px] p-4 transition-all flex flex-col gap-3 relative group font-sans cursor-pointer select-none ${
                                selectedFile?.id === file.id
                                  ? "bg-red-50/40 border-red-300 ring-1 ring-red-300"
                                  : "bg-white border-gray-100 hover:bg-slate-50 hover:border-red-200"
                              }`}
                            >
                              <div className="flex justify-between items-start">
                                <div className="p-2.5 bg-slate-50 rounded-[10px] group-hover:bg-white transition-all shrink-0">
                                  {getMimeIcon(file.mimeType, file.name)}
                                </div>
                                <div className="flex items-center gap-0.5">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleToggleFavorite(file);
                                    }}
                                    className="text-gray-300 hover:text-amber-500 p-1 cursor-pointer"
                                  >
                                    <Star
                                      className={`w-3.5 h-3.5 ${
                                        file.isFavorite ? "text-amber-500 fill-amber-500" : ""
                                      }`}
                                    />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveMenuId(activeMenuId === file.id ? null : file.id);
                                    }}
                                    className="text-gray-300 hover:text-black p-1 cursor-pointer"
                                  >
                                    <MoreVertical className="w-3.5 h-3.5" />
                                  </button>
                                  {activeMenuId === file.id && (
                                    <div className="absolute right-2 top-10 w-40 bg-white border border-gray-100 rounded-[10px] shadow-lg z-20 py-1 text-left font-sans">
                                      {!file.isFolder && (
                                        <button
                                          onClick={() => {
                                            setActiveMenuId(null);
                                            handleOpenLocal(file);
                                          }}
                                          className="w-full px-3 py-1.5 text-left hover:bg-blue-50 text-[11px] font-bold flex items-center gap-2 text-blue-700 cursor-pointer animate-pulse"
                                        >
                                          <svg className="w-3.5 h-3.5 text-blue-600 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                          </svg>
                                          Open Local App
                                        </button>
                                      )}
                                      {!file.isFolder && (
                                        <button
                                          onClick={() => {
                                            setActiveMenuId(null);
                                            handleCopy(file);
                                          }}
                                          className="w-full px-3 py-1.5 text-left hover:bg-slate-50 text-[11px] font-semibold flex items-center gap-2 text-gray-700 cursor-pointer"
                                        >
                                          <Copy className="w-3.5 h-3.5" />
                                          Make Copy
                                        </button>
                                      )}
                                      <button
                                        onClick={() => {
                                          setActiveMenuId(null);
                                          setMoveTargetFolderId(file.parentId);
                                          setShowMoveModal(file);
                                        }}
                                        className="w-full px-3 py-1.5 text-left hover:bg-slate-50 text-[11px] font-semibold flex items-center gap-2 text-gray-700 cursor-pointer"
                                      >
                                        <Move className="w-3.5 h-3.5" />
                                        Relocate
                                      </button>
                                      <button
                                        onClick={() => {
                                          setActiveMenuId(null);
                                          setRenameValue(file.name);
                                          setShowRenameModal(file);
                                        }}
                                        className="w-full px-3 py-1.5 text-left hover:bg-slate-50 text-[11px] font-semibold flex items-center gap-2 text-gray-700 cursor-pointer"
                                      >
                                        <Edit2 className="w-3.5 h-3.5" />
                                        Rename
                                      </button>
                                      <button
                                        onClick={() => {
                                          setActiveMenuId(null);
                                          handleDelete(file);
                                        }}
                                        className="w-full px-3 py-1.5 text-left hover:bg-slate-50 text-[11px] font-semibold flex items-center gap-2 text-red-600 hover:text-red-700 cursor-pointer"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        Remove
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="flex-1">
                                <p className={`text-xs leading-tight font-sans line-clamp-2 ${file.isFolder ? "font-bold text-gray-900" : "font-semibold text-gray-700"}`}>
                                  {file.name}
                                </p>
                                {file.version > 1 && (
                                  <span className="bg-red-50 text-red-600 text-[8px] font-extrabold px-1.5 py-0.5 rounded-full uppercase mt-1 inline-block">
                                    v{file.version}
                                  </span>
                                )}
                                <p className="text-[9px] text-gray-400 font-semibold uppercase mt-1 tracking-wider font-mono">
                                  {file.isFolder ? "Folder" : formatSize(file.size)}
                                </p>
                              </div>

                              <div className="border-t border-gray-50 pt-2 flex items-center justify-between font-sans">
                                <span className="text-[9px] text-gray-400 font-medium">{file.ownerName}</span>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  {!file.isFolder && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handlePreview(file);
                                      }}
                                      className="p-1 hover:bg-gray-100 rounded text-gray-500 cursor-pointer"
                                      title="View"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDownloadFile(file);
                                    }}
                                    className="p-1 hover:bg-gray-100 rounded text-gray-500 cursor-pointer"
                                    title="Download"
                                  >
                                    <Download className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* RIGHT CONTAINER: Collapsible Windows Details Pane */}
                    {showDetailsPane && (
                      <div className="w-72 border-l border-gray-150 bg-slate-50/50 p-4 shrink-0 flex flex-col overflow-y-auto select-none font-sans">
                        {selectedFile ? (
                          <div className="space-y-4">
                            {/* Header preview box */}
                            <div className="flex flex-col items-center text-center p-3 border border-gray-100 bg-white rounded-[10px] shadow-sm">
                              <div className="p-4 bg-slate-50 rounded-full mb-2">
                                {getMimeIcon(selectedFile.mimeType, selectedFile.name)}
                              </div>
                              <h4 className="text-xs font-bold text-gray-900 break-all px-2 leading-relaxed">
                                {selectedFile.name}
                              </h4>
                              <p className="text-[10px] text-gray-400 font-semibold uppercase mt-1 font-mono">
                                {selectedFile.isFolder ? "File Folder" : selectedFile.name.split(".").pop() + " File"}
                              </p>
                            </div>

                            {/* Info Fields */}
                            <div className="bg-white border border-gray-100 rounded-[10px] p-3.5 space-y-2.5 shadow-sm text-[11px]">
                              <div>
                                <span className="text-gray-400 font-semibold block uppercase text-[9px] tracking-wide">File Size</span>
                                <span className="font-bold text-gray-800 font-mono">
                                  {selectedFile.isFolder ? "Calculated on server" : formatSize(selectedFile.size)}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-400 font-semibold block uppercase text-[9px] tracking-wide">Virtual Location</span>
                                <span className="font-mono text-gray-700 break-all leading-normal block bg-slate-50 px-1.5 py-1 rounded">
                                  {selectedFile.path}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-400 font-semibold block uppercase text-[9px] tracking-wide">Storage Owner</span>
                                <span className="font-bold text-gray-800">{selectedFile.ownerName}</span>
                              </div>
                              <div>
                                <span className="text-gray-400 font-semibold block uppercase text-[9px] tracking-wide">Last Modified</span>
                                <span className="font-medium text-gray-700 font-mono">
                                  {new Date(selectedFile.updatedAt).toLocaleString()}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-400 font-semibold block uppercase text-[9px] tracking-wide">Revisions / Version</span>
                                <span className="bg-red-50 text-red-700 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full inline-block font-mono">
                                  Version {selectedFile.version}
                                </span>
                              </div>
                            </div>

                            {/* Direct Actions bar */}
                            <div className="space-y-2">
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pl-1">Actions</p>
                              
                              <div className="grid grid-cols-2 gap-2">
                                {!selectedFile.isFolder && (
                                  <button
                                    onClick={() => handlePreview(selectedFile)}
                                    className="px-3 py-2 border border-gray-200 hover:border-red-600 hover:text-red-600 bg-white text-gray-700 font-bold rounded-[8px] text-[10px] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                                  >
                                    <Eye className="w-3.5 h-3.5 text-red-600" />
                                    <span>Preview</span>
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDownloadFile(selectedFile)}
                                  className="px-3 py-2 border border-gray-200 hover:border-emerald-600 hover:text-emerald-700 bg-white text-gray-700 font-bold rounded-[8px] text-[10px] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                                >
                                  <Download className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>Download</span>
                                </button>
                              </div>

                              {!selectedFile.isFolder && (
                                <button
                                  onClick={() => handleOpenLocal(selectedFile)}
                                  className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-[8px] text-[10px] flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer uppercase tracking-wider mt-2"
                                >
                                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                  <span>Open in Local App</span>
                                </button>
                              )}

                              <div className="border-t border-gray-200/60 my-2"></div>

                              <div className="space-y-1">
                                {!selectedFile.isFolder && (
                                  <button
                                    onClick={() => handleCopy(selectedFile)}
                                    className="w-full px-3 py-1.5 hover:bg-gray-100 rounded-md text-left text-[11px] font-semibold text-gray-700 flex items-center gap-2 cursor-pointer"
                                  >
                                    <Copy className="w-3.5 h-3.5 text-gray-400" />
                                    <span>Make Duplicate Copy</span>
                                  </button>
                                )}
                                <button
                                  onClick={() => {
                                    setMoveTargetFolderId(selectedFile.parentId);
                                    setShowMoveModal(selectedFile);
                                  }}
                                  className="w-full px-3 py-1.5 hover:bg-gray-100 rounded-md text-left text-[11px] font-semibold text-gray-700 flex items-center gap-2 cursor-pointer"
                                >
                                  <Move className="w-3.5 h-3.5 text-gray-400" />
                                  <span>Move/Relocate Item</span>
                                </button>
                                <button
                                  onClick={() => {
                                    setRenameValue(selectedFile.name);
                                    setShowRenameModal(selectedFile);
                                  }}
                                  className="w-full px-3 py-1.5 hover:bg-gray-100 rounded-md text-left text-[11px] font-semibold text-gray-700 flex items-center gap-2 cursor-pointer"
                                >
                                  <Edit2 className="w-3.5 h-3.5 text-gray-400" />
                                  <span>Rename Item</span>
                                </button>
                                <button
                                  onClick={() => handleDelete(selectedFile)}
                                  className="w-full px-3 py-1.5 hover:bg-red-50 hover:text-red-700 rounded-md text-left text-[11px] font-bold text-red-600 flex items-center gap-2 cursor-pointer transition-all"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Permanently Delete</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400 py-10 px-2 font-sans">
                            <svg className="w-8 h-8 text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-[11px] font-bold uppercase tracking-wider">No Item Selected</p>
                            <p className="text-[10px] text-gray-400 mt-1 leading-normal">
                              Single click any file or folder to display its complete metadata and rapid operations panel here.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Windows Explorer Status Bar */}
                  <div className="h-6 border-t border-gray-150 bg-slate-50 px-4 flex items-center justify-between text-[10px] font-sans font-medium text-gray-500 shrink-0 select-none">
                    <div className="flex items-center gap-3">
                      <span>{files.length} {files.length === 1 ? "item" : "items"}</span>
                      {selectedFile && (
                        <>
                          <div className="w-px h-3 bg-gray-300"></div>
                          <span className="text-gray-700 font-bold">1 item selected</span>
                          {!selectedFile.isFolder && (
                            <>
                              <div className="w-px h-3 bg-gray-300"></div>
                              <span className="font-mono">{formatSize(selectedFile.size)}</span>
                            </>
                          )}
                        </>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span>Host Connection: LAN-10Gbps</span>
                      <div className="w-px h-3 bg-gray-300"></div>
                      <span>Quota: {formatSize(currentUser?.usedSpace || 0)} / {formatSize(currentUser?.quota || 0)} ({calculateQuotaPct()}%)</span>
                    </div>
                  </div>
                </div>
              )}
              {/* TAB 3: ADMIN USERS AND STORAGE LIMITS */}
              {activeTab === "admin-roots" && (
            <div className="space-y-6 animate-fade-in pb-12">
              <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Storage Locations (Shared Roots)</h2>
                  <p className="text-sm text-gray-500">Map physical disk directories to enterprise roles</p>
                </div>
                <button onClick={() => setShowNewRootModal(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                  <Plus className="w-4 h-4" /> Add Location
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold">
                    <tr>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Physical Path</th>
                      <th className="px-6 py-4">Allowed Roles</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {adminRoots.map(r => (
                      <tr key={r.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-800 flex items-center gap-2">
                          <HardDrive className="w-4 h-4 text-gray-400" /> {r.name}
                        </td>
                        <td className="px-6 py-4 font-mono text-xs text-gray-500">{r.relativePath}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-1 flex-wrap">
                            {r.allowedRoleIds.map((rid: string) => (
                              <span key={rid} className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100">{rid}</span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={async () => {
                            if (!confirm("Remove this storage mapping? Files on disk will NOT be deleted.")) return;
                            await fetch(`/api/admin/roots/${r.id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
                            setAdminRoots(adminRoots.filter(x => x.id !== r.id));
                          }} className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {adminRoots.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                          No physical storage locations mapped.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "admin-users" && (
                <div className="flex-1 overflow-y-auto space-y-6">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <div>
                      <h2 className="text-lg font-bold text-black tracking-tight font-sans">User Management Console</h2>
                      <p className="text-xs text-gray-400 font-semibold mt-0.5 uppercase tracking-wider">
                        Configure storage quotas and status for corporate accounts
                      </p>
                    </div>
                    <button
                      onClick={() => setShowNewUserModal(true)}
                      className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-[10px] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      Create New Teammate
                    </button>
                  </div>

                  {/* Total storage of Storage CPU, allocated space, and free spaces */}
                  {adminStats && (
                    <div className="grid grid-cols-3 gap-4 mb-4 select-none">
                      {/* CARD 1: Total storage capacity of Storage CPU */}
                      <div className="bg-white border border-gray-100 rounded-[10px] p-4 shadow-sm relative overflow-hidden font-sans">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Total CPU Storage Capacity</p>
                          <Server className="w-4 h-4 text-red-600" />
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl font-black text-gray-900 tracking-tight font-sans">
                            {formatSize(adminStats.systemTotalSpace || (100 * 1024 * 1024 * 1024))}
                          </span>
                          <span className="text-[10px] font-bold text-red-600 font-mono">StorageCPU Pool</span>
                        </div>
                        <div className="w-full bg-gray-100 h-1 rounded-full mt-3 overflow-hidden">
                          <div className="bg-red-600 h-full rounded-full" style={{ width: "100%" }}></div>
                        </div>
                        <p className="text-[9px] text-gray-400 mt-1.5 font-mono">
                          Core Temp: {adminStats.cpuTemp || 43}°C | CPU Load: {adminStats.cpuLoad || 18}%
                        </p>
                      </div>

                      {/* CARD 2: Allocated Space */}
                      <div className="bg-white border border-gray-100 rounded-[10px] p-4 shadow-sm relative overflow-hidden font-sans">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Allocated Spaces</p>
                          <HardDrive className="w-4 h-4 text-amber-500" />
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl font-black text-gray-900 tracking-tight font-sans">
                            {formatSize(adminStats.totalQuotaAllocated)}
                          </span>
                          <span className="text-[10px] text-amber-600 font-bold">
                            ({Math.round((adminStats.totalQuotaAllocated / (adminStats.systemTotalSpace || (100 * 1024 * 1024 * 1024))) * 100)}% allocated)
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 h-1 rounded-full mt-3 overflow-hidden">
                          <div 
                            className="bg-amber-500 h-full rounded-full transition-all duration-300" 
                            style={{ width: `${Math.min(100, Math.round((adminStats.totalQuotaAllocated / (adminStats.systemTotalSpace || (100 * 1024 * 1024 * 1024))) * 100))}%` }}
                          ></div>
                        </div>
                        <p className="text-[9px] text-gray-400 mt-1.5 font-mono">
                          Assigned to {adminStats.activeUsers || 2} active teammate accounts
                        </p>
                      </div>

                      {/* CARD 3: Free Spaces */}
                      <div className="bg-white border border-gray-100 rounded-[10px] p-4 shadow-sm relative overflow-hidden font-sans">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Free Spaces (Physical Available)</p>
                          <Activity className="w-4 h-4 text-emerald-500" />
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl font-black text-gray-900 tracking-tight font-sans">
                            {formatSize(adminStats.systemFreeSpace)}
                          </span>
                          <span className="text-[10px] text-emerald-600 font-bold">
                            ({Math.round((adminStats.systemFreeSpace / (adminStats.systemTotalSpace || (100 * 1024 * 1024 * 1024))) * 100)}% free)
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 h-1 rounded-full mt-3 overflow-hidden">
                          <div 
                            className="bg-emerald-500 h-full rounded-full transition-all duration-300" 
                            style={{ width: `${Math.round((adminStats.systemFreeSpace / (adminStats.systemTotalSpace || (100 * 1024 * 1024 * 1024))) * 100)}%` }}
                          ></div>
                        </div>
                        <p className="text-[9px] text-gray-400 mt-1.5 font-mono">
                          Physical space used: {formatSize(adminStats.spaceUsed)}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Users Table */}
                  <div className="border border-gray-100 rounded-[10px] overflow-hidden shadow-sm bg-white">
                    <table className="w-full text-xs text-left border-collapse font-sans">
                      <thead>
                        <tr className="text-[9px] uppercase font-bold text-gray-400 border-b border-gray-50 bg-gray-50">
                          <th className="px-6 py-3.5">Teammate Name</th>
                          <th className="px-6 py-3.5">Assigned Role</th>
                          <th className="px-6 py-3.5">Status</th>
                          <th className="px-6 py-3.5">Active Quota Allocation</th>
                          <th className="px-6 py-3.5 text-right">Administrative Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {adminUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-bold text-gray-900 flex items-center gap-2">
                              <div className="w-7 h-7 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold uppercase text-[10px]">
                                {user.username.substring(0, 2)}
                              </div>
                              {user.username}
                              {user.id === currentUser?.id && (
                                <span className="bg-red-50 text-red-600 font-bold text-[8px] px-1.5 py-0.5 rounded-full uppercase tracking-wider ml-1">
                                  You
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 uppercase font-bold tracking-wider text-[9px] text-gray-500">
                              {user.roleId.replace("_", " ")}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                                  user.status === "disabled"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-emerald-100 text-emerald-800"
                                }`}
                              >
                                {user.status || "active"}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-gray-600 font-medium">
                              <div className="flex items-center gap-3">
                                <span>{formatSize(user.quota)}</span>
                                <div className="flex gap-1 shrink-0">
                                  <button
                                    onClick={() => handleUpdateUserQuota(user.id, user.quota, "down")}
                                    className="px-2 py-0.5 border border-gray-200 text-gray-500 hover:text-black rounded text-[10px] font-bold cursor-pointer"
                                    title="Decrease 1GB"
                                  >
                                    -1GB
                                  </button>
                                  <button
                                    onClick={() => handleUpdateUserQuota(user.id, user.quota, "up")}
                                    className="px-2 py-0.5 border border-gray-200 text-gray-500 hover:text-black rounded text-[10px] font-bold cursor-pointer"
                                    title="Increase 1GB"
                                  >
                                    +1GB
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => setShowResetPassModal(user)}
                                  className="px-2.5 py-1 text-[10px] border border-gray-200 hover:border-black rounded-[10px] font-bold uppercase transition-colors cursor-pointer"
                                >
                                  Change Password
                                </button>
                                {user.id !== currentUser?.id && (
                                  <button
                                    onClick={() => handleToggleUserStatus(user)}
                                    className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-[10px] transition-colors border cursor-pointer ${
                                      user.status === "disabled"
                                        ? "bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-700"
                                        : "bg-red-50 hover:bg-red-100 border-red-200 text-red-700"
                                    }`}
                                  >
                                    {user.status === "disabled" ? "Activate Account" : "Disable Account"}
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 4: RBAC RULES CONFIG */}
              {activeTab === "admin-permissions" && (
                <div className="flex-1 overflow-y-auto space-y-6">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <div>
                      <h2 className="text-lg font-bold text-black tracking-tight font-sans">Role-Based Access Rules</h2>
                      <p className="text-xs text-gray-400 font-semibold mt-0.5 uppercase tracking-wider">
                        Configure explicit folder and role restriction maps
                      </p>
                    </div>
                    <button
                      onClick={() => setShowNewPermModal(true)}
                      className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-[10px] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      Add Access Rule
                    </button>
                  </div>

                  {/* Rules list */}
                  <div className="border border-gray-100 rounded-[10px] overflow-hidden shadow-sm bg-white">
                    <table className="w-full text-xs text-left border-collapse font-sans">
                      <thead>
                        <tr className="text-[9px] uppercase font-bold text-gray-400 border-b border-gray-50 bg-gray-50">
                          <th className="px-6 py-3.5">Assigned Target (Role/User)</th>
                          <th className="px-6 py-3.5">Virtual Directory Folder Path</th>
                          <th className="px-6 py-3.5">Read</th>
                          <th className="px-6 py-3.5">Upload / Write</th>
                          <th className="px-6 py-3.5">Delete</th>
                          <th className="px-6 py-3.5">Download</th>
                          <th className="px-6 py-3.5">Rename</th>
                          <th className="px-6 py-3.5 text-right">Operations</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {adminPermissions.map((perm) => (
                          <tr key={perm.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-3.5 font-bold text-gray-900">
                              {perm.roleId ? (
                                <span className="text-[10px] uppercase bg-slate-100 px-2.5 py-0.5 rounded-full tracking-wider text-gray-600">
                                  Role: {perm.roleId.replace("_", " ")}
                                </span>
                              ) : perm.userId ? (
                                <span className="text-[10px] bg-red-50 text-red-600 px-2.5 py-0.5 rounded-full tracking-wider font-semibold">
                                  User: {adminUsers.find((u) => u.id === perm.userId)?.username || perm.userId}
                                </span>
                              ) : (
                                "Everyone"
                              )}
                            </td>
                            <td className="px-6 py-3.5 font-mono text-gray-700 font-semibold">{perm.folderPath}</td>
                            <td className="px-6 py-3.5">
                              {perm.read ? (
                                <CheckCircle className="w-4.5 h-4.5 text-emerald-600" />
                              ) : (
                                <X className="w-4.5 h-4.5 text-red-400" />
                              )}
                            </td>
                            <td className="px-6 py-3.5">
                              {perm.write ? (
                                <CheckCircle className="w-4.5 h-4.5 text-emerald-600" />
                              ) : (
                                <X className="w-4.5 h-4.5 text-red-400" />
                              )}
                            </td>
                            <td className="px-6 py-3.5">
                              {perm.delete ? (
                                <CheckCircle className="w-4.5 h-4.5 text-emerald-600" />
                              ) : (
                                <X className="w-4.5 h-4.5 text-red-400" />
                              )}
                            </td>
                            <td className="px-6 py-3.5">
                              {perm.download ? (
                                <CheckCircle className="w-4.5 h-4.5 text-emerald-600" />
                              ) : (
                                <X className="w-4.5 h-4.5 text-red-400" />
                              )}
                            </td>
                            <td className="px-6 py-3.5">
                              {perm.rename ? (
                                <CheckCircle className="w-4.5 h-4.5 text-emerald-600" />
                              ) : (
                                <X className="w-4.5 h-4.5 text-red-400" />
                              )}
                            </td>
                            <td className="px-6 py-3.5 text-right">
                              <button
                                onClick={() => handleRevokePermission(perm.id)}
                                className="text-[10px] text-red-600 font-bold uppercase hover:underline transition-all cursor-pointer"
                              >
                                Revoke Rule
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 5: AUDIT LOGS */}
              {activeTab === "admin-logs" && (
                <div className="flex-1 overflow-hidden flex flex-col gap-4">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-4 shrink-0">
                    <div>
                      <h2 className="text-lg font-bold text-black tracking-tight font-sans">Corporate Audit Logging</h2>
                      <p className="text-xs text-gray-400 font-semibold mt-0.5 uppercase tracking-wider">
                        Verifiable transaction logs for physical downloads, logins, and deletes
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Filter log table..."
                        value={adminLogsFilter}
                        onChange={(e) => setAdminLogsFilter(e.target.value)}
                        className="px-3 py-1 bg-white border border-gray-200 rounded-[10px] text-xs focus:outline-none w-48 font-sans"
                      />
                    </div>
                  </div>

                  <div className="flex-1 border border-gray-100 rounded-[10px] overflow-y-auto shadow-sm bg-white">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="text-[9px] uppercase font-bold text-gray-400 border-b border-gray-50 bg-gray-50 sticky top-0 z-10">
                          <th className="px-6 py-3 bg-gray-50">Event Timestamp</th>
                          <th className="px-6 py-3 bg-gray-50">Initiating Personnel</th>
                          <th className="px-6 py-3 bg-gray-50">Action Type</th>
                          <th className="px-6 py-3 bg-gray-50">Virtual Target Path</th>
                          <th className="px-6 py-3 bg-gray-50">Originating IP Address</th>
                          <th className="px-6 py-3 bg-gray-50 text-right">Execution Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 font-mono text-[10px]">
                        {filteredLogs.map((log) => (
                          <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-2 text-gray-400">
                              {new Date(log.time).toLocaleTimeString()} // {new Date(log.time).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-2 font-bold text-gray-900">{log.user}</td>
                            <td className="px-6 py-2 text-gray-600">
                              <span className="font-bold">{log.action}</span>
                            </td>
                            <td className="px-6 py-2 text-gray-500 max-w-xs truncate" title={log.file}>
                              {log.file}
                            </td>
                            <td className="px-6 py-2 text-gray-400">{log.ip}</td>
                            <td className="px-6 py-2 text-right">
                              <span
                                className={`font-bold uppercase ${
                                  log.status === "failed" ? "text-red-600" : "text-emerald-600"
                                }`}
                              >
                                {log.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* FOOTER STATUS BAR */}
              <footer className="sticky bottom-0 bg-white z-10 -mx-6 -mb-6 px-6 py-4 border-t border-gray-100 flex items-center justify-between text-[9px] font-bold text-gray-400 uppercase tracking-widest shrink-0 shadow-[0_-1px_3px_rgba(0,0,0,0.02)]">
                <div className="flex gap-6 items-center flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full inline-block animate-pulse"></span>
                    Server Status: Operational
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    Secure Sessions Active
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    RBAC Engine: Active
                  </span>
                  <span className="flex items-center gap-1.5" title={postgresConnected ? "App is connected to a live production PostgreSQL database." : "App is running on persistent JSON storage fallback. Connect an external PostgreSQL database using DATABASE_URL."}>
                    <span className={`w-2 h-2 rounded-full inline-block ${postgresConnected ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`}></span>
                    {postgresConnected ? (
                      <span className="text-emerald-600 font-bold">Database: PostgreSQL (Production Connected)</span>
                    ) : (
                      <span className="text-amber-600 font-bold">Database: File DB (PostgreSQL Fallback)</span>
                    )}
                  </span>
                </div>
                <div className="text-right">
                  Node ID: FM-SRV-01 // LAN Port: 3000
                </div>
              </footer>
            </main>
          </div>

          {/* =======================================================
              MODAL DIALOGS
             ======================================================= */}

          {/* 1. NEW FOLDER MODAL */}
          {showNewFolderModal && (
            <div className="fixed inset-0 bg-black/45 backdrop-blur-xs flex items-center justify-center z-50">
              <div className="bg-white border border-gray-100 rounded-[10px] w-full max-w-sm p-6 shadow-xl">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4 font-sans">
                  <h3 className="font-bold text-xs uppercase tracking-wider">Create Virtual Directory</h3>
                  <button onClick={() => setShowNewFolderModal(false)} className="text-gray-400 hover:text-black cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <form onSubmit={handleCreateFolder} className="space-y-4">
                  <div className="font-sans">
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1.5">
                      Folder Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marketing_Proposal"
                      className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-[10px] focus:outline-none focus:ring-1 focus:ring-red-600 focus:bg-white text-black"
                      value={newFolderName}
                      onChange={(e) => setNewFolderName(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2 font-sans">
                    <button
                      type="button"
                      onClick={() => setShowNewFolderModal(false)}
                      className="px-4 py-1.5 border border-gray-200 text-gray-500 hover:text-black rounded-[10px] text-[10px] font-bold uppercase cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-[10px] text-[10px] font-bold uppercase cursor-pointer"
                    >
                      Create Folder
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* 2. RENAME MODAL */}
          {showRenameModal && (
            <div className="fixed inset-0 bg-black/45 backdrop-blur-xs flex items-center justify-center z-50">
              <div className="bg-white border border-gray-100 rounded-[10px] w-full max-w-sm p-6 shadow-xl font-sans">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
                  <h3 className="font-bold text-xs uppercase tracking-wider">Rename Storage Node</h3>
                  <button onClick={() => setShowRenameModal(null)} className="text-gray-400 hover:text-black cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <form onSubmit={handleRename} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1.5">New Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-[10px] focus:outline-none focus:ring-1 focus:ring-red-600 focus:bg-white text-black"
                      value={renameValue}
                      onChange={(e) => setRenameValue(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowRenameModal(null)}
                      className="px-4 py-1.5 border border-gray-200 text-gray-500 hover:text-black rounded-[10px] text-[10px] font-bold uppercase cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-[10px] text-[10px] font-bold uppercase cursor-pointer"
                    >
                      Rename
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* 3. MOVE MODAL */}
          {showMoveModal && (
            <div className="fixed inset-0 bg-black/45 backdrop-blur-xs flex items-center justify-center z-50">
              <div className="bg-white border border-gray-100 rounded-[10px] w-full max-w-md p-6 shadow-xl font-sans">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
                  <h3 className="font-bold text-xs uppercase tracking-wider">Relocate Storage Node</h3>
                  <button onClick={() => setShowMoveModal(null)} className="text-gray-400 hover:text-black cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <form onSubmit={handleMove} className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-3">
                      Select target destination partition for <strong>{showMoveModal.name}</strong>:
                    </p>
                    <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-100 p-2 rounded-[10px] bg-slate-50">
                      <button
                        type="button"
                        onClick={() => setMoveTargetFolderId(null)}
                        className={`w-full text-left p-2 rounded text-xs flex items-center gap-2 cursor-pointer ${
                          moveTargetFolderId === null ? "bg-red-50 text-red-600 font-bold" : "hover:bg-gray-100 text-black"
                        }`}
                      >
                        <HardDrive className="w-4 h-4 shrink-0 text-gray-500" />
                        <span>/ (Root Storage Pool)</span>
                      </button>

                      {[
                        { name: "My Personal Files", path: `/users/${currentUser.id}/My Files` },
                        { name: "Project Alpha", path: "/projects/Project_A" },
                        { name: "HR Folder", path: "/departments/HR" },
                        { name: "Finance Accounts", path: "/departments/Accounts" },
                        { name: "Templates Directory", path: "/templates" },
                        { name: "Corporate Archive", path: "/archive" }
                      ].map((partition) => {
                        const cacheMatch = (Object.values(folderCache) as FileItem[]).find((f) => f.path === partition.path);
                        if (!cacheMatch) return null;

                        return (
                          <button
                            key={partition.path}
                            type="button"
                            onClick={() => setMoveTargetFolderId(cacheMatch.id)}
                            className={`w-full text-left p-2 rounded text-xs flex items-center gap-2 cursor-pointer ${
                              moveTargetFolderId === cacheMatch.id
                                ? "bg-red-50 text-red-600 font-bold"
                                : "hover:bg-gray-100 text-black"
                            }`}
                          >
                            <Folder className="w-4 h-4 text-red-600 shrink-0" />
                            <span>{partition.name} ({partition.path})</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowMoveModal(null)}
                      className="px-4 py-1.5 border border-gray-200 text-gray-500 hover:text-black rounded-[10px] text-[10px] font-bold uppercase cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-[10px] text-[10px] font-bold uppercase cursor-pointer"
                    >
                      Relocate
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* 4. PREVIEW MODAL */}
          {previewFile && (
            <div className="fixed inset-0 bg-black/45 backdrop-blur-xs flex items-center justify-center z-50">
              <div className="bg-white border border-gray-100 rounded-[10px] w-full max-w-2xl p-6 shadow-2xl h-[560px] md:h-[640px] max-h-[90vh] flex flex-col font-sans">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3 shrink-0">
                  <div className="flex items-center gap-2">
                    {getMimeIcon(previewFile.mimeType, previewFile.name)}
                    <span className="font-bold text-xs uppercase tracking-wider">{previewFile.name}</span>
                  </div>
                  <button onClick={closePreview} className="text-gray-400 hover:text-black cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 overflow-hidden py-4 bg-slate-50 border border-gray-100 rounded-[10px] my-4 p-4 text-xs font-mono text-gray-700">
                  {previewLoading ? (
                    <div className="flex justify-center items-center h-full gap-2 font-sans">
                      <RefreshCw className="w-5 h-5 animate-spin text-red-600" />
                      <span>Downloading secure segment...</span>
                    </div>
                  ) : previewFile.mimeType.startsWith("image/") ? (
                    <div className="flex items-center justify-center h-full">
                      <img
                        src={previewContent || ""}
                        alt={previewFile.name}
                        className="max-h-full max-w-full object-contain rounded-[10px]"
                      />
                    </div>
                  ) : isPreviewPdf ? (
                    <div className="w-full h-full rounded-[10px] overflow-hidden bg-white">
                      <iframe
                        src={previewContent || ""}
                        className="w-full h-full border-0"
                        title={previewFile.name}
                      />
                    </div>
                  ) : isPreviewAudio ? (
                    <div className="flex flex-col items-center justify-center h-full p-6 bg-white rounded-[10px] gap-4 font-sans">
                      <div className="p-4 bg-red-50 text-red-600 rounded-full">
                        <Music className="w-12 h-12" />
                      </div>
                      <p className="text-xs font-bold text-gray-700 break-all">{previewFile.name}</p>
                      <audio
                        controls
                        src={previewContent || ""}
                        className="w-full max-w-md focus:outline-none"
                        autoPlay
                      />
                    </div>
                  ) : isPreviewVideo ? (
                    <div className="flex items-center justify-center h-full bg-black rounded-[10px] overflow-hidden">
                      <video
                        controls
                        src={previewContent || ""}
                        className="max-h-full max-w-full"
                        autoPlay
                      />
                    </div>
                  ) : isPreviewText ? (
                    <pre className="whitespace-pre-wrap break-all leading-relaxed font-mono text-[11px] h-full overflow-y-auto block p-3 bg-slate-900 text-slate-100 rounded-[8px] select-text">
                      {previewContent}
                    </pre>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-3 text-center text-gray-400">
                      <FileText className="w-12 h-12 text-gray-300" />
                      <div>
                        <p className="font-bold text-gray-700">Physical Preview Not Renderable Inside Browser</p>
                        <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-widest font-semibold">
                          Format: {previewFile.mimeType} // Size: {formatSize(previewFile.size)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDownloadFile(previewFile)}
                        className="mt-2 px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-[10px] font-bold uppercase tracking-wider text-[10px] cursor-pointer"
                      >
                        Download Full Document
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center shrink-0">
                  <span className="text-[10px] text-gray-400 font-semibold uppercase font-mono">
                    Version: {previewFile.version} // Hash: {previewFile.hash || "MD5_N/A"}
                  </span>
                  <button
                    onClick={() => {
                      handleDownloadFile(previewFile);
                      closePreview();
                    }}
                    className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-[10px] text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Download File
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* LOCAL OPEN INTEGRATION HELPER */}
          {localOpenHelpFile && (
            <div className="fixed inset-0 bg-black/45 backdrop-blur-xs flex items-center justify-center z-50 animate-fade-in">
              <div className="bg-white border border-gray-100 rounded-[12px] w-full max-w-md p-6 shadow-2xl flex flex-col font-sans animate-scale-up">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </span>
                    <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">Local Software Integration</h3>
                  </div>
                  <button onClick={() => setLocalOpenHelpFile(null)} className="text-gray-400 hover:text-black cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4 text-xs text-gray-600 leading-relaxed">
                  <div className="p-3.5 bg-blue-50/50 border border-blue-100 rounded-lg">
                    <p className="font-extrabold text-blue-800 text-center mb-1 text-[11px] uppercase tracking-wider">
                      Opening via Local Application:
                    </p>
                    <p className="font-mono text-center text-[11px] text-gray-700 font-bold break-all">
                      {localOpenHelpFile.name}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-800 uppercase text-[10px] tracking-wider mb-2">
                      💡 How to Open Instantly (No Manual Downloads)
                    </h4>
                    <p className="mb-2 text-[11px]">
                      Browsers run in a secure sandbox and require a quick, one-time preference setup to launch local desktop apps immediately:
                    </p>
                    <ol className="list-decimal pl-4 space-y-1.5 font-medium text-gray-700 text-[11px]">
                      <li>
                        Look at the <span className="font-bold text-blue-600">Downloads drawer</span> of your browser (usually top-right).
                      </li>
                      <li>
                        Right-click or click the action menu options on <span className="font-semibold text-gray-800">{localOpenHelpFile.name}</span>.
                      </li>
                      <li>
                        Check/Enable <span className="font-bold text-emerald-600">"Always open files of this type"</span> or <span className="font-bold text-emerald-600">"Open automatically"</span>.
                      </li>
                    </ol>
                  </div>

                  <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg text-amber-900 text-[11px] leading-relaxed">
                    <span className="font-bold">Next Double-Click:</span> Double-clicking this extension format in Zeus Vault will now instantly boot up the registered local software (e.g. Microsoft Word, VLC Player, Excel, Acrobat, Notepad) automatically!
                  </div>
                </div>

                <div className="flex gap-2 justify-end mt-6">
                  <button
                    onClick={() => {
                      if (!token) return;
                      const directUrl = `${window.location.origin}/api/files/download/${localOpenHelpFile.id}?token=${encodeURIComponent(token)}`;
                      const tempLink = document.createElement("a");
                      tempLink.href = directUrl;
                      tempLink.download = localOpenHelpFile.name;
                      tempLink.target = "_blank";
                      document.body.appendChild(tempLink);
                      tempLink.click();
                      tempLink.remove();
                    }}
                    className="px-4 py-2 border border-gray-200 hover:bg-slate-50 text-gray-700 rounded-[10px] text-xs font-semibold cursor-pointer"
                  >
                    Launch Again
                  </button>
                  <button
                    onClick={() => setLocalOpenHelpFile(null)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-[10px] text-xs font-extrabold cursor-pointer"
                  >
                    Got It, Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 5. NEW USER MODAL */}
          
      {/* ADD STORAGE LOCATION MODAL */}
      {showNewRootModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-scale-in">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="font-bold text-gray-800">Add Storage Location</h3>
              <button onClick={() => setShowNewRootModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddRoot} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Display Name</label>
                <input required type="text" value={newRootName} onChange={e => setNewRootName(e.target.value)} placeholder="e.g. Finance Drive" className="w-full border-gray-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Absolute OS Path</label>
                <input required type="text" value={newRootPath} onChange={e => setNewRootPath(e.target.value)} placeholder="e.g. C:\Users\DELL\Documents" className="w-full font-mono border-gray-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Allowed Roles</label>
                <select multiple value={newRootRoles} onChange={e => setNewRootRoles(Array.from(e.target.selectedOptions, option => option.value))} className="w-full border-gray-200 rounded-lg text-sm h-32 focus:ring-blue-500 focus:border-blue-500">
                  <option value="super_admin">Super Admin</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="employee">Employee</option>
                  <option value="guest">Guest</option>
                </select>
                <p className="text-[10px] text-gray-400 mt-1">Hold Ctrl (Windows) or Cmd (Mac) to select multiple</p>
              </div>
              <div className="pt-4 flex justify-end gap-2">
                <button type="button" onClick={() => setShowNewRootModal(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm transition-colors">Add Location</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showNewUserModal && (
            <div className="fixed inset-0 bg-black/45 backdrop-blur-xs flex items-center justify-center z-50">
              <div className="bg-white border border-gray-100 rounded-[10px] w-full max-w-sm p-6 shadow-xl font-sans">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
                  <h3 className="font-bold text-xs uppercase tracking-wider">Register Teammate Account</h3>
                  <button onClick={() => setShowNewUserModal(false)} className="text-gray-400 hover:text-black cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <form onSubmit={handleCreateUser} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1.5">Username</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. chandru"
                      className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-[10px] focus:outline-none focus:ring-1 focus:ring-red-600 focus:bg-white text-black"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1.5">Password</label>
                    <input
                      type="password"
                      required
                      placeholder="Enter raw password string"
                      className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-[10px] focus:outline-none focus:ring-1 focus:ring-red-600 focus:bg-white text-black"
                      value={newUserPass}
                      onChange={(e) => setNewUserPass(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1.5">Assigned Role</label>
                    <select
                      value={newUserRole}
                      onChange={(e) => setNewUserRole(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-[10px] focus:outline-none"
                    >
                      <option value="super_admin">Super Admin</option>
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="employee">Employee</option>
                      <option value="guest">Guest</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1.5">
                      Quota Limit (GB)
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-[10px] focus:outline-none focus:ring-1 focus:ring-red-600 focus:bg-white text-black"
                      value={newUserQuotaGB}
                      onChange={(e) => setNewUserQuotaGB(parseInt(e.target.value) || 1)}
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowNewUserModal(false)}
                      className="px-4 py-1.5 border border-gray-200 text-gray-500 hover:text-black rounded-[10px] text-[10px] font-bold uppercase cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-[10px] text-[10px] font-bold uppercase cursor-pointer"
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* 6. PASSWORD RESET MODAL */}
          {showResetPassModal && (
            <div className="fixed inset-0 bg-black/45 backdrop-blur-xs flex items-center justify-center z-50">
              <div className="bg-white border border-gray-100 rounded-[10px] w-full max-w-sm p-6 shadow-xl font-sans">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
                  <h3 className="font-bold text-xs uppercase tracking-wider">
                    Reset User Password: {showResetPassModal.username}
                  </h3>
                  <button onClick={() => setShowResetPassModal(null)} className="text-gray-400 hover:text-black cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1.5">
                      New Password String
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="e.g. new_safe_pass_2026"
                      className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-[10px] focus:outline-none focus:ring-1 focus:ring-red-600 focus:bg-white text-black"
                      value={newPasswordValue}
                      onChange={(e) => setNewPasswordValue(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowResetPassModal(null)}
                      className="px-4 py-1.5 border border-gray-200 text-gray-500 hover:text-black rounded-[10px] text-[10px] font-bold uppercase cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-[10px] text-[10px] font-bold uppercase cursor-pointer"
                    >
                      Reset Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* 7. NEW PERMISSION RULE MODAL */}
          {showNewPermModal && (
            <div className="fixed inset-0 bg-black/45 backdrop-blur-xs flex items-center justify-center z-50">
              <div className="bg-white border border-gray-100 rounded-[10px] w-full max-w-md p-6 shadow-xl font-sans">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
                  <h3 className="font-bold text-xs uppercase tracking-wider">Assign Custom Security Rule</h3>
                  <button onClick={() => setShowNewPermModal(false)} className="text-gray-400 hover:text-black cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <form onSubmit={handleAddPermission} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1.5">
                      Rule Scope / Target Type
                    </label>
                    <div className="flex gap-4 mb-3">
                      <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                        <input
                          type="radio"
                          name="permTargetType"
                          checked={newPermTargetType === "role"}
                          onChange={() => setNewPermTargetType("role")}
                          className="text-red-600 focus:ring-red-600"
                        />
                        Role Designation
                      </label>
                      <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                        <input
                          type="radio"
                          name="permTargetType"
                          checked={newPermTargetType === "user"}
                          onChange={() => setNewPermTargetType("user")}
                          className="text-red-600 focus:ring-red-600"
                        />
                        Specific Teammate
                      </label>
                    </div>

                    {newPermTargetType === "role" ? (
                      <div>
                        <label className="block text-[9px] font-bold uppercase text-gray-400 mb-1">
                          Target Role
                        </label>
                        <select
                          value={newPermRole}
                          onChange={(e) => setNewPermRole(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-[10px] focus:outline-none text-black"
                        >
                          <option value="super_admin">Super Admin</option>
                          <option value="admin">Admin</option>
                          <option value="manager">Manager</option>
                          <option value="employee">Employee</option>
                          <option value="guest">Guest</option>
                        </select>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-[9px] font-bold uppercase text-gray-400 mb-1">
                          Target Teammate
                        </label>
                        <select
                          value={newPermUserId}
                          onChange={(e) => setNewPermUserId(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-[10px] focus:outline-none text-black"
                          required
                        >
                          <option value="" disabled>-- Select a Teammate --</option>
                          {adminUsers.map((u) => (
                            <option key={u.id} value={u.id}>
                              {u.username} ({u.roleId.replace("_", " ")})
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1.5">
                      Virtual Folder Path
                    </label>
                    {systemFolders.length > 0 ? (
                      <select
                        value={newPermPath}
                        onChange={(e) => setNewPermPath(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-[10px] focus:outline-none text-black"
                        required
                      >
                        <option value="" disabled>-- Select a Folder --</option>
                        {systemFolders.map((f) => (
                          <option key={f.id} value={f.path}>
                            {f.path}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        required
                        placeholder="e.g. /projects/Project_A"
                        className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-[10px] focus:outline-none focus:ring-1 focus:ring-red-600 focus:bg-white text-black"
                        value={newPermPath}
                        onChange={(e) => setNewPermPath(e.target.value)}
                      />
                    )}
                  </div>

                  <div className="border border-gray-150 p-3 rounded-[10px] space-y-2 bg-slate-50">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Granted Capabilities</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <label className="flex items-center gap-2 font-medium">
                        <input
                          type="checkbox"
                          checked={newPermRead}
                          onChange={(e) => setNewPermRead(e.target.checked)}
                          className="rounded border-gray-300 text-red-600 focus:ring-red-600"
                        />
                        Read / View Files
                      </label>
                      <label className="flex items-center gap-2 font-medium">
                        <input
                          type="checkbox"
                          checked={newPermWrite}
                          onChange={(e) => setNewPermWrite(e.target.checked)}
                          className="rounded border-gray-300 text-red-600 focus:ring-red-600"
                        />
                        Write / Upload Files
                      </label>
                      <label className="flex items-center gap-2 font-medium">
                        <input
                          type="checkbox"
                          checked={newPermDelete}
                          onChange={(e) => setNewPermDelete(e.target.checked)}
                          className="rounded border-gray-300 text-red-600 focus:ring-red-600"
                        />
                        Delete Files
                      </label>
                      <label className="flex items-center gap-2 font-medium">
                        <input
                          type="checkbox"
                          checked={newPermDownload}
                          onChange={(e) => setNewPermDownload(e.target.checked)}
                          className="rounded border-gray-300 text-red-600 focus:ring-red-600"
                        />
                        Download Files
                      </label>
                      <label className="flex items-center gap-2 font-medium">
                        <input
                          type="checkbox"
                          checked={newPermRename}
                          onChange={(e) => setNewPermRename(e.target.checked)}
                          className="rounded border-gray-300 text-red-600 focus:ring-red-600"
                        />
                        Rename Folders / Files
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowNewPermModal(false)}
                      className="px-4 py-1.5 border border-gray-200 text-gray-500 hover:text-black rounded-[10px] text-[10px] font-bold uppercase cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-[10px] text-[10px] font-bold uppercase cursor-pointer"
                    >
                      Save Rule
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
