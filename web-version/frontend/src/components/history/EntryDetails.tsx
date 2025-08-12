import React from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../../services/store';

const EntryDetails: React.FC<{
  entryId: string;
}> = ({ entryId }) => {
  const { entries, loading } = useSelector((state: RootState) => state.entries);
  
  // Trouver l'entrée correspondante
  const entry = entries.find(e => e.id === entryId);
  
  if (loading) {
    return <div className="text-center py-4">Chargement...</div>;
  }
  
  if (!entry) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Entrée non trouvée</p>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-4">
        Détails de l'entrée du {new Date(entry.date).toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-medium text-lg mb-2">Rencontres Dynamiques (RD)</h3>
          <p className="text-2xl">{entry.rdCompleted} <span className="text-gray-500 text-lg">/ {entry.rdTarget}</span></p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div 
              className="bg-primary h-2.5 rounded-full" 
              style={{ width: `${Math.min(100, (entry.rdCompleted / entry.rdTarget) * 100)}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-lg mb-2">Prière Seule (PS)</h3>
          <p className="text-2xl">{entry.psHours}h <span className="text-gray-500 text-lg">/ {entry.psTarget}h</span></p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div 
              className="bg-light-blue h-2.5 rounded-full" 
              style={{ width: `${Math.min(100, (entry.psHours / entry.psTarget) * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {entry.bibleReading && (
        <div className="mb-6">
          <h3 className="font-medium text-lg mb-2">Lecture Biblique (LB)</h3>
          <p className="text-2xl">{entry.bibleReading.chaptersCount} <span className="text-gray-500 text-lg">/ {entry.bibleReading.chaptersTarget} chapitres</span></p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2 mb-2">
            <div 
              className="bg-secondary h-2.5 rounded-full" 
              style={{ width: `${Math.min(100, (entry.bibleReading.chaptersCount / entry.bibleReading.chaptersTarget) * 100)}%` }}
            ></div>
          </div>
          {entry.bibleReading.chaptersList && entry.bibleReading.chaptersList.length > 0 && (
            <div className="mt-2 p-3 bg-gray-50 rounded-md">
              <h4 className="text-sm font-medium mb-1">Chapitres lus:</h4>
              <p className="text-sm">
                {Array.isArray(entry.bibleReading.chaptersList) 
                  ? entry.bibleReading.chaptersList.join(', ')
                  : entry.bibleReading.chaptersList}
              </p>
            </div>
          )}
        </div>
      )}
      
      {entry.christianReading && (
        <div>
          <h3 className="font-medium text-lg mb-2">Littérature Chrétienne (LC)</h3>
          <p className="text-2xl">{entry.christianReading.pagesCount} <span className="text-gray-500 text-lg">pages</span></p>
          {entry.christianReading.bookName && (
            <div className="mt-2 p-3 bg-gray-50 rounded-md">
              <h4 className="text-sm font-medium mb-1">Livre:</h4>
              <p className="text-sm">{entry.christianReading.bookName}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EntryDetails;
