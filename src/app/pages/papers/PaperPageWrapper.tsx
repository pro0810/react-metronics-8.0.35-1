import React, {FC, useEffect, useState} from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {useParams} from 'react-router-dom'
import {DefaultPapers} from './DefaultPapers'
import {PaperNames} from './PapersModels'
import axios from 'axios'

const PaperPageWrapper: FC = () => {
  const params: PaperNames = useParams()
  const urlPrefix = 'http://10.97.33.190:3000/dev/'
  // const urlPrefix = 'http://10.97.33.190:8085/dev/'
  const paperUrl = `${urlPrefix}${DefaultPapers[params.name]}`
  const [content, setContent] = useState<any>()
  // yuo can find all params from here
  useEffect(() => {
    axios
      .get<any>(paperUrl)
      .then(({data}) => {
        console.log('here', paperUrl, data)
        setContent(data)
      })
      .catch(() => {
        console.log('error here')
      })
  }, [paperUrl])

  const paperBreadCrumbs: Array<PageLink> = [
    {
      title: 'Paper',
      path: '/paper',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]

  return (
    <>
      <PageTitle breadcrumbs={paperBreadCrumbs}>{params.name}</PageTitle>
      <iframe
        // src={paperUrl}
        title={params.name}
        className='position-fixed w-100 h-100 start-0 pb-100'
        srcDoc={content}
      />
    </>
  )
}

export default PaperPageWrapper
