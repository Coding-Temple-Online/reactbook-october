import React, { useCallback, useEffect, useState } from 'react'
import { Main } from './views/Main';
import firebase from './firebase'
import { collection, getDocs, getFirestore } from '@firebase/firestore';

export const App = () => {
  return (
    <div>
      <Main />
    </div>
  )
}
