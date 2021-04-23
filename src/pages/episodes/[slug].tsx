import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { api } from '../../services/api';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';
import styles from './episode.module.scss';

type Episode = {
  id: string;
  title: string;
  members: string;
  publishedAt: string;
  thumbnail: string;
  description: string; 
  url: string;
  duration: number;
  durationAsString: string;
}

type EpisodeProps = {
  episode: Episode;
}

export default function Episode({ episode }: EpisodeProps) {

  return (
    <div className={styles.episodeContainer}>
      <div className={styles.episode}>
        <div className={styles.thumbnailContainer}>
          <Link href="/">
            <button>
              <img src="/arrow-left.svg" alt="Voltar" />
            </button>
          </Link>
          <Image width={700} height={160} src={episode.thumbnail} objectFit="cover"/>
          <button>
            <img src="/play.svg" alt="Tocar episódio" />
          </button>
        </div>
        <header>
          <h1>{episode.title}</h1>
          <span>{episode.members}</span>
          <span>{episode.publishedAt}</span>
          <span>{episode.durationAsString}</span>
        </header>
        <div className={styles.description} dangerouslySetInnerHTML={{__html: episode.description}}/>
          
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {

  const { data } = await api.get('episodes', {
    params: {
      _limit: 2,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const paths = data.map(ep => {
    return {
      params: {
        slug: ep.id
      }
    }
  })

  return {
    /* 
    paths: [], não gera pagina estatica durante o build, apenas ao ser consumido
    paths: [ params : { nomeparametro: valor parametro} ], gera as paginas estaticas 
    informadas no params durante o build
    
    exemplo utilizado gera as paginas estaticas dos ultimos dois episódios
    */
    paths,
    /*
    fallback: false - não cria novas paginas - retorna 404
    fallback: true - cria a pagina no lado do client
    fallback: blocking - cria a pagina no lado do servidor

    ISR - Incremental Static Regeneration
    */
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;
  const { data } = await api.get(`/episodes/${slug}`)

  const episode = {
    id: data.id,
    title: data.title,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }),
    thumbnail: data.thumbnail,
    description: data.description,
    url: data.file.url,
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
  }

  return {
    props: {
      episode
    },
    revalidate: 60 * 60 * 24,
  }
}