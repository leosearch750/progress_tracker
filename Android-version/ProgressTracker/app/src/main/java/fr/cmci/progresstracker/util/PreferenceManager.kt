package fr.cmci.progresstracker.util

import android.content.Context
import android.content.SharedPreferences

class PreferenceManager(context: Context) {
    private val prefs: SharedPreferences = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE)

    fun saveUserId(userId: Long) {
        prefs.edit().putLong(KEY_USER_ID, userId).apply()
    }

    fun getUserId(): Long {
        return prefs.getLong(KEY_USER_ID, -1)
    }

    fun isLoggedIn(): Boolean {
        return getUserId() != -1L
    }

    fun logout() {
        prefs.edit().remove(KEY_USER_ID).apply()
    }

    companion object {
        private const val PREF_NAME = "progress_tracker_prefs"
        private const val KEY_USER_ID = "user_id"
    }
}