import React from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../../services/store';

const EntryList: React.FC = () => {
  const { entries, loading } = useSelector((state: RootState) => state.entries);

  if (loading) {
    return <div className="text-center py-4">Chargement...</div>;
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Aucune entrée trouvée</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div key={entry.id} className="card p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">
                {new Date(entry.date).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </h3>
              <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div>
                  <span className="font-medium text-primary">RD:</span> {entry.rdCompleted}/{entry.rdTarget}
                </div>
                <div>
                  <span className="font-medium text-light-blue">PS:</span> {entry.psHours}h/{entry.psTarget}h
                </div>
                {entry.bibleReading && (
                  <div className="col-span-2">
                    <span className="font-medium text-secondary">LB:</span> {entry.bibleReading.chaptersCount} chapitres
                    {entry.bibleReading.chaptersList && entry.bibleReading.chaptersList.length > 0 && (
                      <span className="block text-xs text-gray-500 mt-1">
                        {Array.isArray(entry.bibleReading.chaptersList) 
                          ? entry.bibleReading.chaptersList.join(', ')
                          : entry.bibleReading.chaptersList}
                      </span>
                    )}
                  </div>
                )}
                {entry.christianReading && (
                  <div className="col-span-2">
                    <span className="font-medium text-accent">LC:</span> {entry.christianReading.pagesCount} pages
                    {entry.christianReading.bookName && (
                      <span className="block text-xs text-gray-500 mt-1">
                        {entry.christianReading.bookName}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-1 text-blue-600 hover:text-blue-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <button className="p-1 text-red-600 hover:text-red-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EntryList;
