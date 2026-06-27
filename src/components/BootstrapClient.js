'use client';

import { useEffect } from 'react';

/**
 * Loads Bootstrap's JavaScript bundle on the client.
 * Needed for the mobile navbar toggle, dropdowns, etc.
 * Rendering nothing — it only runs the side effect.
 */
export default function BootstrapClient() {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return null;
}
