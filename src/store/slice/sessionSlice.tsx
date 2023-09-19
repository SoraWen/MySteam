import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SessionState {
  user: {
    name: string;
    email: string;
    image: string;
  } | null;
}

const initialState: SessionState = {
  user: null,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<SessionState["user"]>) => {
      state.user = action.payload;
    },
    clearSession: (state) => {
      state.user = null;
    },
  },
});

export const { setSession, clearSession } = sessionSlice.actions;
export default sessionSlice.reducer;
