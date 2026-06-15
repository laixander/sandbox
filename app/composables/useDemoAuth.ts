// ============================================================================
// Composable: useDemoAuth
// ============================================================================
// Ergonomic wrapper around authStore for use in pages and components.
//
// Usage:
//   const { currentUser, isAuthenticated, setRole, logout } = useDemoAuth()
//   setRole('Admin')    // logs in as Admin
//   logout()            // clears session


import { useAuthStore } from '~/stores/authStore'

export const useDemoAuth = () => {
    const store = useAuthStore()
    const router = useRouter()

    const setRole = (roleId: string) => {
        store.login(roleId)
    }

    const logout = async () => {
        store.logout()
        await router.push('/login')
    }

    return {
        currentUser: computed(() => store.currentUser),
        isAuthenticated: computed(() => store.isAuthenticated),
        role: computed(() => store.role),
        isAdmin: computed(() => store.isAdmin),
        isStaff: computed(() => store.isStaff),
        setRole,
        logout,
    }
}
