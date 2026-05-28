import React, { useMemo, useState } from 'react';
import { Graph, MaxHeap, Trie } from './dataStructures.js';

const initialSongs = [
  { title: 'blinding lights', artist: 'The Weeknd', popularity: 980 },
  { title: 'flowers', artist: 'Miley Cyrus', popularity: 820 },
  { title: 'as it was', artist: 'Harry Styles', popularity: 760 },
  { title: 'levitating', artist: 'Dua Lipa', popularity: 690 },
  { title: 'bad guy', artist: 'Billie Eilish', popularity: 640 },
  { title: 'shape of you', artist: 'Ed Sheeran', popularity: 590 }
];

const initialEdges = [
  ['blinding lights', 'as it was'],
  ['blinding lights', 'levitating'],
  ['flowers', 'bad guy'],
  ['flowers', 'shape of you'],
  ['as it was', 'shape of you'],
  ['levitating', 'bad guy']
];

function buildTrie(songs) {
  const trie = new Trie();
  songs.forEach((song) => trie.insert(song.title));
  return trie;
}

function buildHeap(songs) {
  return new MaxHeap(songs);
}

function buildGraph(songs, edges) {
  const graph = new Graph();
  songs.forEach((song) => graph.addNode(song.title));
  edges.forEach(([songA, songB]) => graph.addEdge(songA, songB));
  return graph;
}

function searchTopK(songs, trie, prefix, limit) {
  const titles = trie.wordsWithPrefix(prefix);
  const filteredSongs = songs.filter((song) => titles.includes(song.title));
  return new MaxHeap(filteredSongs).top(limit);
}

export default function App() {
  const [songs, setSongs] = useState(initialSongs);
  const [edges, setEdges] = useState(initialEdges);
  const [newTitle, setNewTitle] = useState('');
  const [newArtist, setNewArtist] = useState('');
  const [newPopularity, setNewPopularity] = useState(100);
  const [relatedWith, setRelatedWith] = useState(initialSongs[0].title);
  const [query, setQuery] = useState('');
  const [selectedSong, setSelectedSong] = useState(initialSongs[0].title);

  const trie = useMemo(() => buildTrie(songs), [songs]);
  const heap = useMemo(() => buildHeap(songs), [songs]);
  const graph = useMemo(() => buildGraph(songs, edges), [songs, edges]);

  const cleanQuery = query.trim().toLowerCase();
  const exists = cleanQuery ? trie.search(cleanQuery) : false;
  const suggestions = cleanQuery ? trie.suggestions(cleanQuery) : [];
  const topSongs = heap.top(5);
  const topByPrefix = cleanQuery ? searchTopK(songs, trie, cleanQuery, 3) : [];
  const relatedSongs = graph.getAdjacency(selectedSong);

  function addSong(event) {
    event.preventDefault();

    const title = newTitle.trim().toLowerCase();
    const artist = newArtist.trim() || 'Artista desconocido';

    if (!title) return;

    setSongs([
      ...songs,
      {
        title,
        artist,
        popularity: Number(newPopularity)
      }
    ]);

    if (relatedWith) {
      setEdges([...edges, [title, relatedWith]]);
    }

    setNewTitle('');
    setNewArtist('');
    setNewPopularity(100);
    setRelatedWith(title);
    setQuery(title);
    setSelectedSong(title);
  }

  return (
    <main className="app">
      <section className="hero">
        <p className="logo">Spotify</p>
        <div>
          <h1>Parcial 3</h1>
          <p>Mini plataforma de musica usando Trie, Max Heap y grafo no dirigido.</p>
        </div>
      </section>

      <section className="grid">
        <article className="panel">
          <h2>Buscador predictivo</h2>
          <label>
            Buscar cancion
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Ej: blinding"
            />
          </label>

          {cleanQuery && (
            <p className={exists ? 'status ok' : 'status'}>
              {exists ? 'La cancion existe.' : 'La cancion no esta registrada.'}
            </p>
          )}

          <div className="chips">
            {suggestions.map((song) => (
              <button key={song} type="button" onClick={() => setSelectedSong(song)}>
                {song}
              </button>
            ))}
          </div>

          {topByPrefix.length > 0 && (
            <div className="prefix-top">
              <h3>Top por prefijo</h3>
              {topByPrefix.map((song) => (
                <p key={song.title}>
                  {song.title} - {song.popularity}
                </p>
              ))}
            </div>
          )}
        </article>

        <article className="panel">
          <h2>Insertar canciones</h2>
          <form onSubmit={addSong} className="form">
            <input
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
              placeholder="Titulo"
            />
            <input
              value={newArtist}
              onChange={(event) => setNewArtist(event.target.value)}
              placeholder="Artista"
            />
            <input
              type="number"
              min="0"
              value={newPopularity}
              onChange={(event) => setNewPopularity(event.target.value)}
              placeholder="Reproducciones"
            />
            <select value={relatedWith} onChange={(event) => setRelatedWith(event.target.value)}>
              {songs.map((song) => (
                <option key={song.title} value={song.title}>
                  Relacionar con {song.title}
                </option>
              ))}
            </select>
            <button type="submit">Agregar</button>
          </form>
        </article>

        <article className="panel">
          <h2>Ranking popular</h2>
          <ol className="ranking">
            {topSongs.map((song) => (
              <li key={song.title}>
                <span>
                  <strong>{song.title}</strong>
                  <small>{song.artist}</small>
                </span>
                <b>{song.popularity}</b>
              </li>
            ))}
          </ol>
        </article>

        <article className="panel">
          <h2>Recomendaciones</h2>
          <label>
            Cancion base
            <select value={selectedSong} onChange={(event) => setSelectedSong(event.target.value)}>
              {songs.map((song) => (
                <option key={song.title} value={song.title}>
                  {song.title}
                </option>
              ))}
            </select>
          </label>

          <ul className="related">
            {relatedSongs.length ? (
              relatedSongs.map((song) => <li key={song}>{song}</li>)
            ) : (
              <li>Sin conexiones todavia</li>
            )}
          </ul>

          <div className="adjacency">
            <h3>Lista de adyacencia</h3>
            <p>{selectedSong}: {relatedSongs.join(', ') || 'sin conexiones'}</p>
          </div>
        </article>
      </section>
    </main>
  );
}
